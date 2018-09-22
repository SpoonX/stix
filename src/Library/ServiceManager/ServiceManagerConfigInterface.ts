import { ServiceManagerInterface } from './ServiceManagerInterface';
import { Instantiable } from '../Core/Types';
import { FactoryInterface } from './FactoryInterface';

export interface ServiceFactoryType<T> extends Function { (sm?: ServiceManagerInterface): T; }

export type FactoriesMapType = Map<Function | string, FactoryInterface>;

export type ServicesMapType = Map<Function | string, Object>;

export type InvokablesMapType<T> = Map<Instantiable<Object> | string, Instantiable<T>>;

export type AliasesType = { [alias: string]: string | Function };

export type SharedMapType = Map<Function | string, Object>;

export type ServiceKeyType<T> = Instantiable<T> | string;

export type ServiceManagerConfigType = Partial<{
  sharedByDefault: boolean;
  shared: SharedMapType;
  services: ServicesMapType;
  factories: FactoriesMapType;
  aliases: AliasesType;
  invokables: InvokablesMapType<Object>;
}>;
