// @todo rename to Command
// @todo implement a CommandService
export class Cli {
  public static command (command: string, controller: { new() : Object }, action: string, config?: Object) {
    return {
      command,
      controller,
      action,
      config,
    };
  }

  public static program (command: string, config?: Object) {
    return {
      command,
      config,
    };
  }
}
