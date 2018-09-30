import { CliCommandConfigType, CliCommandType, CliProgramConfigType, CliProgramType } from './CliTypes';
import { AbstractCommand } from '../Command/AbstractCommand';

export class Cli {
  /**
   * Convenience method to help format a command.
   *
   * ┌─1─┐┌──2────┐            ┌4┐
   * stix generate module user -v
   * │    └───────3─────────────┘
   * └─────────5────────────────┘
   *
   *  Legend:
   *    1. Command name   Maps to Command
   *    2. Token          Maps to action
   *    3. Arguments      Passed to the action
   *    4. Options        Passed to the action as part of arguments
   *    5. Command line   The full command line, maps to command.
   *
   * @param {string}                commandLine
   * @param {AbstractCommand}       Command
   * @param {string}                action
   * @param {CliCommandConfigType}  config
   *
   * @return {CliCommandType}
   */
  public static command (commandLine: string, Command: typeof AbstractCommand, action: string, config?: CliCommandConfigType): CliCommandType {
    return { commandLine, Command, action, config };
  }

  public static program (program: string, config?: CliProgramConfigType): CliProgramType {
    return { program, config };
  }
}
