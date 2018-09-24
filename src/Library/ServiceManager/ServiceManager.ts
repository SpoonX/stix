import { ServiceManagerInterface } from './ServiceManagerInterface';
import { ServicesMapType, FactoriesMapType, AliasesType, ServiceKeyType, ServiceFactoryType, SharedMapType, ServiceManagerConfigType } from './ServiceManagerConfigInterface';
import { NotFoundError } from '../Error';
import { Instantiable } from '../Core/Types';
import { InjectedServiceFactory } from './InjectedServiceFactory';
import { applyPatches } from './decorators';

/**
 * @export
 * @class ServiceManager
 * @implements {ServiceManagerInterface}
 */
export class ServiceManager implements ServiceManagerInterface {
  private services: ServicesMapType = new Map();

  private factories: FactoriesMapType = new Map();

  private aliases: AliasesType = {};

  private shared: SharedMapType = new Map();

  private sharedByDefault: boolean = true;

  protected creationContext: ServiceManager;

  constructor (config?: ServiceManagerConfigType) {
    this.creationContext = this;

    if (config) {
      this.configure(config);
    }
  }

  public get<T> (Service: ServiceKeyType<T>, forceTransient: boolean = false): T {
    const resolvedName = this.resolveName(Service) as ServiceKeyType<T>;

    if (!this.has(resolvedName)) {
      throw new NotFoundError(`Unable to locate service "${typeof Service === 'string' ? Service : Service.name}".`);
    }

    if (forceTransient || !this.services.has(resolvedName)) {
      const service = this.factories.get(resolvedName)(this.creationContext) as T;
      const shared  = this.shared.has(resolvedName) ? this.shared.get(resolvedName) : this.sharedByDefault;

      // Apply any patches registered with the @patch decorator
      applyPatches(this.creationContext, service);

      // We just needed a new instance or we don't want our instances to be shared.. Return service.
      if (forceTransient || !shared) {
        return service;
      }

      this.services.set(resolvedName, service);
    }

    return this.services.get(resolvedName) as T;
  }

  has<T> (Service: ServiceKeyType<T>): boolean {
    const resolvedName = this.resolveName(Service) as ServiceKeyType<T>;

    return this.services.has(resolvedName) || this.factories.has(resolvedName);
  }

  public registerFactory (key: Function | string, value: ServiceFactoryType<Object>): this {
    this.factories.set(key, value);

    return this;
  }

  public registerFactories (factories: FactoriesMapType): this {
    factories.forEach((value: ServiceFactoryType<Object>, key: Function | string) => {
      this.registerFactory(key, value);
    });

    return this;
  }

  public registerService (key: Function | string, service: Object): this {
    this.services.set(key, service);

    return this;
  }

  public configure (config: ServiceManagerConfigType): this {
    if (typeof config.sharedByDefault === 'boolean') {
      this.sharedByDefault = config.sharedByDefault;
    }

    if (config.shared instanceof Map) {
      config.shared.forEach((value, key: ServiceKeyType<Object>) => this.shared.set(key, value));
    }

    if (config.services instanceof Map) {
      config.services.forEach((value, key: ServiceKeyType<Object>) => this.services.set(key, value));
    }

    if (config.invokables instanceof Map) {
      config.invokables.forEach((value: Instantiable<Object>, key: ServiceKeyType<Object>) => {
        this.registerInvokable(key, value);
      });
    }

    if (config.factories instanceof Map) {
      this.registerFactories(config.factories);
    }

    if (config.aliases) {
      Object.assign(this.aliases, config.aliases);
    }

    return this;
  }

  public registerInvokable (key: ServiceKeyType<Object>, value: Instantiable<Object>) {
    this.factories.set(key, InjectedServiceFactory(value));
  }

  public registerAliases (aliases: AliasesType): this {
    Object.assign(this.aliases, aliases);

    return this;
  }

  public registerAlias (alias: string, to: string | Function): this {
    this.aliases[alias] = to;

    return this;
  }

  private resolveName<T> (name: ServiceKeyType<T>): ServiceKeyType<T> {
    if (typeof name !== 'string') {
      return name;
    }

    return this.aliases[name] as ServiceKeyType<T> || name;
  }
}
