import { ServiceManagerInterface } from './ServiceManagerInterface';
import { ServicesMapType, FactoriesMapType, AliasesType, ServiceKeyType, ServiceFactoryType, SharedMapType, ServiceManagerConfigType, ServiceType } from './ServiceManagerConfigInterface';
import { NotFoundError } from '../Error';

/**
 * @todo implement shared/non-shared for singleton vs
 *
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

  constructor(config?: ServiceManagerConfigType) {
    this.creationContext = this;

    if (config) {
      this.configure(config);
    }
  }

  public get<T>(Service: ServiceKeyType<T>, forceTransient: boolean = false): T {
    const resolvedName = this.resolveName(Service) as ServiceType<T>;

    if (!this.has(resolvedName)) {
      throw new NotFoundError(`Unable to locate service "${typeof Service === 'string' ? Service : Service.name}".`);
    }

    if (forceTransient || !this.services.has(resolvedName)) {
      const service = this.factories.get(resolvedName)(this.creationContext) as T;

      // We just needed a new instance or we don't want our instances to be shared.. Return service.
      if (forceTransient || (!this.sharedByDefault && !this.shared.has(resolvedName))) {
        return service;
      }

      this.services.set(resolvedName, service);
    }

    return this.services.get(resolvedName) as T;
  }

  has<T>(Service: ServiceKeyType<T>): boolean {
    const resolvedName = this.resolveName(Service) as ServiceType<T>;

    return this.services.has(resolvedName) || this.factories.has(resolvedName);
  }

  public registerFactory(key: Function | string, value: ServiceFactoryType<Object>): this {
    this.factories.set(key, value);

    return this;
  }

  public registerFactories(factories: FactoriesMapType): this {
    factories.forEach((value: ServiceFactoryType<Object>, key: Function | string) => {
      this.registerFactory(key, value);
    });

    return this;
  }

  public registerService(key: Function | string, service: Object): this {
    this.services.set(key, service);

    return this;
  }

  public configure(config: ServiceManagerConfigType): this {
    if (typeof config.sharedByDefault === 'boolean') {
      this.sharedByDefault = config.sharedByDefault;
    }

    if (config.shared instanceof Map) {
      config.shared.forEach((value, key: Function | string) => this.shared.set(key, value));
    }

    if (config.services instanceof Map) {
      config.services.forEach((value, key: Function | string) => this.services.set(key, value));
    }

    if (config.invokables instanceof Map) {
      config.invokables.forEach((value, key: Function | string) => {
        this.factories.set(key, () => new value);
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

  private resolveName<T>(name: ServiceKeyType<T>): ServiceKeyType<T> {
    if (typeof name !== 'string') {
      return name;
    }

    return this.aliases[name] as ServiceKeyType<T> || name;
  }
}
