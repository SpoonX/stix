import fs from 'fs';
import path from 'path';
import { ControllerManagerConfigInterface } from '../Config';
import { ControllerInterface } from './ControllerInterface';

export class ControllerManager {
  private controllers: { [controllerName: string]: Object } = {};

  private config: ControllerManagerConfigInterface;

  public static getControllerName(controller: string | ControllerInterface): string {
    if (typeof controller === 'string') {
      return controller;
    }

    return controller.name;
  }

  constructor(config: ControllerManagerConfigInterface) {
    this.config = config;

    this.loadControllers(this.config.location);
  }

  public loadControllers(controllerDirectory: string) {
    const controllers: Array<ControllerInterface> = fs.readdirSync(controllerDirectory)
      .filter((fileName: string) => !!fileName.match(/^(?!(index)).+\.js$/))
      .map((fileName: string) => fileName.replace(/\.js$/, ''))
      .map((controller: string) => {
        const Controller = require(path.resolve(controllerDirectory, controller));

        if (typeof Controller === 'function') {
          return Controller;
        }

        if (typeof Controller.default === 'function') {
          return Controller.default;
        }

        if (typeof Controller[controller] === 'function') {
          return Controller[controller];
        }

        throw new TypeError(`Unable to load controller "${controller}" due to missing constructable export.`);
      });

      this.registerControllers(controllers);
  }

  public getController(controller: string | ControllerInterface): Object {
    return this.controllers[ControllerManager.getControllerName(controller)];
  }

  public registerControllers(controllers: Array<ControllerInterface>): this {
    controllers.forEach(Controller => this.registerController(Controller));

    return this;
  }

  public registerController(Controller: ControllerInterface): this {
    this.controllers[Controller.name] = new Controller;

    return this;
  }
}
