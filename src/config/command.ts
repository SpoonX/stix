import { CommandManagerConfigType } from '../Library/Command';
import { HelpCommand } from '../Library/Command';

export const command: CommandManagerConfigType = {
  commands: {
    invokables: new Map([
      [ HelpCommand, HelpCommand ],
    ]),
  },
};
