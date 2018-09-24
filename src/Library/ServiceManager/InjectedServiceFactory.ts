import { Instantiable } from '../Core';
import { getDependencies } from './decorators';
import { ServiceManager } from './ServiceManager';

export type InjectedFactoryPluginType = (sm: ServiceManager, service?: Object) => Object;

type DIArgumentsType = {
  property: string;
  dependency: Instantiable<Object>;
  plugin?: InjectedFactoryPluginType;
};

type ServiceType = { [property: string]: any };

export const InjectedServiceFactory = (Service: Instantiable<Object>) => (sm: ServiceManager) => {
  const service      = new Service;
  const dependencies = getDependencies(service);

  if (!dependencies) {
    return service;
  }

  return dependencies.reduce((service: ServiceType, { property, dependency, plugin }: DIArgumentsType) => {
    service[property] = plugin ? plugin(sm, service) : sm.get(dependency);

    return service;
  }, service);
};
