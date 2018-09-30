import { CliCommandType, CliProgramType } from './CliTypes';

export type CliConfigType = Partial<{
  bin: string;
  title: string;
  subtitle: string;
  fallbackToken: string;
  defaultProgramName: string;
  commands: Array<CliProgramType | CliCommandType>;
}>;
