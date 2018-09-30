import { Cli } from '../Library/Cli';
import { HelpCommand } from '../Library/Command/HelpCommand';

const fallbackToken = 'help';
const bin = 'stix';

export const cli = {
  bin,
  fallbackToken,
  title: 'Stix CLI',
  subtitle: 'Stix CLI tools for your stix CLI needs. \n\t...And by that we mean stix projects.',
  defaultProgramName: 'project',
  defaultProgramDescription: 'Project-scope commands.',
  defaultProgramFooter: '',
  commands: [
    Cli.program('cli', {
      commands: [
        Cli.command('help [command]', HelpCommand, 'output', {
          description: 'Output help for provided command',
        }),
      ],
      examples: [
        `$ ${bin} ${fallbackToken}`,
        `$ ${bin} ${fallbackToken} some:command`,
      ],
    }),
  ],
};
