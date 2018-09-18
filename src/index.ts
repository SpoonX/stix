import { Application, ConfigInterface } from './Library';

export * from './Library';

export default (config: ConfigInterface) => new Application(config);
