import { ServiceManager } from '../ServiceManager';

const metaKey  = Symbol('stix:di:patch');

type PatchArgumentsType = {
  name: string;
  method: Function;
  factory: boolean;
};

export const patch = (name: string, method: Function, factory: boolean = false) => {
  return (target: ServiceType) => {
    const meta = Reflect.getMetadata(metaKey, target) || [];

    meta.push({ name, method, factory });

    Reflect.defineMetadata(metaKey, meta, target);
  };
};

export const applyPatches = (sm: ServiceManager, target: ServiceType) => {
  const patches = Reflect.getMetadata(metaKey, target.constructor);

  if (!patches) {
    return target;
  }

  return patches.reduce((target: ServiceType, { name, method, factory }: PatchArgumentsType) => {
    if (typeof target[name] !== 'function') {
      target[name] = (factory ? method(sm, target) : method).bind(target);
    }

    return target;
  }, target);
};

type ServiceType = { [property: string]: any };
