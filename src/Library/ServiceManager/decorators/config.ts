import { Config } from '../../Config';
import { ServiceManager } from '../ServiceManager';
import { inject } from './inject';

export const config = (of?: string) => inject(null, (sm: ServiceManager) => sm.get(Config).of(of));
