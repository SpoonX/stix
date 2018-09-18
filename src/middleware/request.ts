import bytes from 'bytes';
import { Middleware } from 'koa';
import { ContextInterface, Response } from '../Library';
import { RequestMethods } from '../Library/Server';
import createDebugLogger from '../debug';

const debug = createDebugLogger('middleware:request');

export default () => async function request (ctx: ContextInterface, next: Function) {
  debug(`<-- ${ctx.method.toUpperCase()} ${ctx.path}`);
  await next();

  const response: Response = ctx.state.response;

  response.patchContext(ctx);

  // Head doesn't want a body. Hehe. I get why it's called head now.
  // Raphaela seems to think that's not why they call it head. I'm filing for divorce.
  // She looks sad now as she's reading along while I type this. For the record: I'm joking!
  // No divorce.
  // ...
  // Yet.
  // JK!
  // Okay time to be productive again.
  if (ctx.method === RequestMethods.Head) {
    delete ctx.body;
  }

  debug(`--> ${ctx.method.toUpperCase()} ${ctx.path} ${response.getStatusCode()} ${bytes(ctx.length)}`);
};
