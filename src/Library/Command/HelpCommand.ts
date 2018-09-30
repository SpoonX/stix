import chalk from 'chalk';
import commandLineUsage from 'command-line-usage';
import { AbstractCommand } from './AbstractCommand';
import { CliCommandOptionsType, CliCommandType, CliService, ProcessedProgramType } from '../Cli';
import { inject } from '../ServiceManager/decorators';
import { Output } from '../Output';

export class HelpCommand extends AbstractCommand {
  @inject(CliService)
  private cliService: CliService;

  output ({ params, options }: any, output: Output) {
    const config   = this.cliService.getConfig();
    const programs = this.cliService.getPrograms();

    if (params.command) {
      const command = this.cliService.getCommand(params.command);

      if (!command) {
        return output.error(`Unknown command "${params.command}".`);
      }

      return output.addData(commandLineUsage(this.renderUsage(command)));
    }

    const sections: { [ key: string ]: any } = [
      { header: config.title, content: `{italic ${config.subtitle}}` },
      {
        header: chalk.yellow('Available commands:'),
      },
    ];

    const collectedExamples: string[] = [];

    Object.values(programs).forEach(({ program, commands, examples }: ProcessedProgramType) => {
      sections.push({ content: chalk.yellow(program), raw: true });
      sections.push({ content: Object.keys(commands).map((command: string) => this.renderCommand(commands[ command ])) });

      if (Array.isArray(examples)) {
        collectedExamples.push(...examples);
      }
    });

    if (collectedExamples) {
      sections.push(this.renderExamples(collectedExamples));
    }

    output.addData(commandLineUsage(sections));
  }

  private renderUsage (command: CliCommandType): { [ key: string ]: any } {

    const sections: { [ key: string ]: any } = [
      { header: chalk.yellow('Usage'), content: [ this.renderCommand(command) ] },
    ];

    if (command.config) {
      if (command.config.options) {
        sections.push(this.renderOptions(command.config.options));
      }

      if (command.config.examples) {
        sections.push(this.renderExamples(command.config.examples));
      }
    }

    return sections;
  }

  private renderOptions (options: CliCommandOptionsType) {
    return {
      header: chalk.yellow('Options:'),
      optionList: Object.keys(options).map(optionName => {
        const { alias, description, value } = options[optionName];

        return {
          description,
          alias: chalk.green(alias),
          name: chalk.green(optionName),
          typeLabel: value && `{underline ${value}}`,
        };
      }),
    };
  }

  private renderExamples (examples: string[]) {
    return {
      header: chalk.yellow('Examples:'),
      content: examples.map(description => ({ description })),
    };
  }

  private renderCommand ({ commandLine, config }: CliCommandType) {
    return { name: chalk.green(commandLine), description: (config && config.description) || '{italic No description found}' };
  }
}
