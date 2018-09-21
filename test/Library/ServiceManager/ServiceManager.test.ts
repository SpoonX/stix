import { ServiceManager } from '../../../src/Library/ServiceManager';
import { ServiceFactoryType, ServiceKeyType, ServiceManagerConfigType } from '../../../src/Library/ServiceManager/ServiceManagerConfigInterface';

describe('ServiceManager', () => {
  class UselessService {
    public value: string;

    constructor (value: string) {
      this.value = value;
    }
  }

  const serviceManagerFactory = () => new ServiceManager({
    services: new Map([ [ Date, new Date ] ]),
    invokables: new Map([ [ 'StupidWayToGetADateInstance', Date ] ]),
    factories: new Map<ServiceKeyType<Object>, ServiceFactoryType<Object>>([
      [ 'UselessService', () => new UselessService('Really String') ],
      [ UselessService, () => new UselessService('Really Reference') ],
      [ Date, () => 'This should never be called' ],
    ]),
    aliases: {
      uselessAlias: UselessService,
    },
  } as ServiceManagerConfigType);

  describe('constructor()', () => {
    it ('Should construct properly without any arguments.', () => {
      const serviceManager = new ServiceManager();

      expect(serviceManager).toBeInstanceOf(ServiceManager);
    });

    it ('Should construct and register services when provided with a config.', () => {
      const serviceManager = serviceManagerFactory();

      expect(serviceManager['services'].get(Date)).toBeInstanceOf(Date);
      expect(serviceManager['factories'].get('UselessService')()).toBeInstanceOf(UselessService);
      expect(serviceManager['aliases'].uselessAlias).toBe(UselessService);
      expect(typeof serviceManager['factories'].get('StupidWayToGetADateInstance')).toBe('function');
      expect(serviceManager['factories'].get('StupidWayToGetADateInstance')()).toBeInstanceOf(Date);
    });

  });

  describe('.get()', () => {
    const serviceManager = serviceManagerFactory();

    it('resolves to a service based on an alias key', () => {
      expect(serviceManager.get('uselessAlias')).toStrictEqual(serviceManager.get(UselessService));
    });

    it('should not call the factory if the service already exists', () => {
      expect(serviceManager.get(Date)).toBeInstanceOf(Date);
    });

    it('should register the service after calling the factory', () => {
      expect(serviceManager['services'].has('UselessService')).toBe(false);
      expect(serviceManager.get('UselessService')).toBeInstanceOf(UselessService);
      expect(serviceManager['services'].has('UselessService')).toBe(true);
    });
  });
});
