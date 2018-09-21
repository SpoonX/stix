import { Application, ConfigType } from './Library';

export * from './Library';

export default (config: ConfigType) => new Application(config);
