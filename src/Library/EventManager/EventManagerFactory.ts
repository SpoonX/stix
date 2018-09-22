import { ServiceManager } from '../ServiceManager';
import { SharedEventManager } from './SharedEventManager';
import { EventManager } from './EventManager';

export const EventManagerFactory = (sm: ServiceManager) => {
  return new EventManager(sm.has(SharedEventManager) ? sm.get(SharedEventManager) : null);
};
