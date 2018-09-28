// @todo https://github.com/mklabs/tabtab
// @todo post-install of modules collect commands for performance
import yargs, { Argv } from 'yargs';
import { CliConfigType } from './CliConfigType';

export class CliService {
  public initialize (config: CliConfigType) {
    const ble = this.assembleProgram(yargs, config.commands);


    ble.argv;
  }

  private assembleProgram (yargs, commands: CliConfigType['commands'], prefix = '') {
    commands.forEach(({ command, controller, action, config }) => {
      yargs.command(command, config.describe || 'leeg', (configurator: Argv): Argv => {
        if (config.subCommands) {
          this.assembleProgram(yargs, config.subCommands, `${prefix} ${command}`);
        }

        return configurator;
      }, (x: any) => {
        if (!controller) {
          console.log('This is not a command.');
          yargs.showHelp();
        } else {
          controller[action](x);
        }

        process.exit(0);
      });

      if (config.options) {
        yargs.options(config.options);
      }
    });

    return yargs;
  }

  private assembleCommand () {

  }
}
