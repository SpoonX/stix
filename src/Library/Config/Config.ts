import { Homefront } from 'homefront';
import { ConfigInterface } from './ConfigInterface';

export class Config extends Homefront {
  all(): ConfigInterface {
    return this.getData() as ConfigInterface;
  }

  of<T> (section: string):T {
    return this.fetch(section);
  }
}
