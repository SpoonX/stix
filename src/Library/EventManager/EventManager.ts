import { EventEmitter } from 'events';
import { Event } from './Event';
import { SelfDestructingCallbackInterface } from './EventManagerTypes';
import { createDebugLogger } from '../../debug';

const debug = createDebugLogger('eventManager');

export class EventManager extends EventEmitter {
  protected sharedEventManager: EventManager;

  private hooks: { [eventName: string]: Array<Function> } = {};

  public constructor (sharedEventManager: EventManager = null) {
    super();

    this.sharedEventManager = sharedEventManager;
  }

  async trigger (eventName: string, target: any, payload?: any): Promise<boolean> {
    debug(`Triggering event: ${eventName}.`);

    if (!this.hooks[eventName]) {
      debug('No listeners attached.');

      return false;
    }

    const callbacks = this.hooks[eventName];

    let triggered = 0;
    let detached  = 0;
    let remaining = callbacks.length;

    for (let i = 0; i < remaining; i++) {
      const callback = callbacks[i] as SelfDestructingCallbackInterface;

      await callback(new Event<typeof target>(eventName, target, payload));

      if (callback._isSelfDestructingCallback) {
        callbacks.splice(i, 1);

        detached++;
        remaining--;
        i--;
      }

      triggered++;
    }

    if (!remaining) {
      delete this.hooks[eventName];
    }

    debug(`Called ${triggered} listeners for: ${eventName} (detached ${detached} one-time listeners).`);

    return true;
  }

  has (event: string, callback: Function): boolean {
    return this.hooks[event] && this.hooks[event].indexOf(callback) > -1;
  }

  attachOnce (eventName: string, callback: Function, index?: number) {
    (callback as SelfDestructingCallbackInterface)._isSelfDestructingCallback = true;

    this.attach(eventName, callback, index);
  }

  attach (event: string, callback: Function, index?: number): this {
    this.hooks[event] = this.hooks[event] || [];

    if (index) {
      this.hooks[event].splice(index, 0, callback);
    } else {
      this.hooks[event].push(callback);
    }

    return this;
  }

  attachAt (index: number, event: string, callback: Function): this {
    return this.attach(event, callback, index);
  }

  detach (event: string, callback: Function): this {
    if (!this.hooks[event]) {
      return this;
    }

    const hookIndex: number = this.hooks[event].indexOf(callback);

    if (hookIndex === -1) {
      return this;
    }

    this.hooks[event].splice(hookIndex, 1);

    if (this.hooks[event].length === 0) {
      delete this.hooks[event];
    }

    return this;
  }

  getSharedEventManager (): EventManager {
    return this.sharedEventManager;
  }
}
