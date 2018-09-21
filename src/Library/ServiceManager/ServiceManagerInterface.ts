import { ServiceKeyType } from './ServiceManagerConfigInterface';

export interface ServiceManagerInterface {
  get<T>(Service: ServiceKeyType<T>): T;
}
