import { ServiceManagerConfigType } from '../ServiceManager';

export type FileBasedPluginManagerConfigType = Partial<{
  plugins: ServiceManagerConfigType;
  locations: string[];
}>;
