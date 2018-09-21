import { ServiceManagerConfigType } from '../ServiceManager';

export type ControllerManagerConfigType = Partial<{
  location: string;
  controllers: ServiceManagerConfigType;
}>;
