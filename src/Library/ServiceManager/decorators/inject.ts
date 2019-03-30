import 'reflect-metadata';
import { InjectedFactoryPluginType } from '../InjectedServiceFactory';

const metaKey = Symbol('stix:di:inject');

export const inject = (dependency?: any, plugin?: InjectedFactoryPluginType) => {
  return (target: Object, property: string) => {
    const meta = Reflect.getMetadata(metaKey, target);
    const result = Array.isArray(meta)
      ? meta.concat({ property, dependency, plugin })
      : [ { property, dependency, plugin } ];

    Reflect.defineMetadata(metaKey, result, target);
  };
};

export const getDependencies = (target: Object) => Reflect.getMetadata(metaKey, target);
