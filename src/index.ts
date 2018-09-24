import { Application, ConfigType } from './Library';

export * from './Library';
export * from './debug';

export default (config: ConfigType) => new Application(config);
