import { ServiceManagerInterface } from './ServiceManagerInterface';

export interface ServiceType<T> extends Function { new (...args: any[]): T; }

export interface ServiceFactoryType<T> extends Function { (sm?: ServiceManagerInterface): T; }

export type FactoriesMapType = Map<Function | string, ServiceFactoryType<Object>>;

export type ServicesMapType = Map<Function | string, Object>;

export type InvokablesMapType<T> = Map<Function | string, { new (...args: any[]): T; }>;

export type AliasesType = { [alias: string]: string | Function };

export type SharedMapType = Map<Function | string, Object>;

export type ServiceKeyType<T> = ServiceType<T> | string;

export type ServiceManagerConfigType = Partial<{
  sharedByDefault: boolean;
  shared: SharedMapType;
  services: ServicesMapType;
  factories: FactoriesMapType;
  aliases: AliasesType;
  invokables: InvokablesMapType<Object>;
}>;
