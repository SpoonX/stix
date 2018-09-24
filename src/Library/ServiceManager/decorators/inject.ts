import 'reflect-metadata';
import { InjectedFactoryPluginType } from '../InjectedServiceFactory';

const metaKey = Symbol('stix:di:inject');

export const inject = (dependency?: any, plugin?: InjectedFactoryPluginType) => {
  return (target: Object, property: string) => {
    const meta = Reflect.getMetadata(metaKey, target) || [];

    meta.push({ property, dependency, plugin });

    Reflect.defineMetadata(metaKey, meta, target);
  };
};

export const getDependencies = (target: Object) => Reflect.getMetadata(metaKey, target);
