import { ServiceManagerConfigType } from '../ServiceManager';

export type ControllerManagerConfigType = Partial<{
  locations: string[];
  controllers: ServiceManagerConfigType;
}>;
