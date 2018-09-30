import { AbstractCommand } from '../Command/AbstractCommand';

export type CliCommandType = Partial<{
  token: string;
  commandLine: string;
  Command: typeof AbstractCommand;
  examples: string[];
  action: string;
  args: { name: string, required: boolean }[];
  config: CliCommandConfigType;
}>;

export type CliCommandConfigType = Partial<{
  description: string;
  examples: string[];
  options: CliCommandOptionsType;
}>;

export type CliCommandOptionsType = Partial<{
  [option: string]: CliCommandOptionType;
}>;

export type CliCommandOptionType = Partial<{
  alias: string;
  value: string;
  description: string;
  defaultTo: any
  required: boolean;
}>;

export type CliProgramType = Partial<{
  program: string;
  config: CliProgramConfigType;
}>;

export type ParsedCommandType = { args: { required: boolean; name: string }[]; token: string; };

export type ProcessedProgramType = { program: string; examples: string[]; commands: ProcessedCommandsType; };

export type ProcessedCommandsType = { [ command: string ]: CliCommandType };

export type CliProgramConfigType = Partial<{
  examples: string[];
  commands: CliCommandType[];
}>;
