import { ServiceManagerConfigType } from '../ServiceManager';

export type CommandManagerConfigType = Partial<{
  locations: string[];
  commands: ServiceManagerConfigType;
}>;

