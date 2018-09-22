import { Event } from './Event';

export interface SelfDestructingCallbackInterface extends Function {
  (event: Event<any>): Promise<void>;
  _isSelfDestructingCallback?: boolean;
}
