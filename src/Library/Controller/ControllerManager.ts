import fs from 'fs';
import path from 'path';
import { ControllerManagerConfigType } from '../Config';
import { ControllerType } from '.';
import { ServiceManager, AbstractPluginManager } from '../ServiceManager';
import { AbstractActionController } from './AbstractActionController';

export class ControllerManager extends AbstractPluginManager {
  constructor (creationContext: ServiceManager, config: ControllerManagerConfigType) {
    super(creationContext, config.controllers);

    if (config.locations) {
      this.loadFromLocations(config.locations);
    }
  }

  public static getControllerName (controller: ControllerType): string {
    if (typeof controller === 'string') {
      return controller;
    }

    return controller.name;
  }

  public loadFromLocations (controllerDirectories: string[]): this {
    controllerDirectories.forEach(directory => this.loadDirectory(directory));

    return this;
  }

  public loadDirectory (controllerDirectory: string) {
    const controllers: Array<typeof AbstractActionController> = fs.readdirSync(controllerDirectory)
      .filter((fileName: string) => !!fileName.match(/^(?!(index))[^.]+\.(js|ts)$/))
      .map((fileName: string) => fileName.replace(/\.(js|ts)$/, ''))
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

  public getController (controller: ControllerType): Object {
    return this.get(controller);
  }

  protected registerControllers (controllers: Array<typeof AbstractActionController>): this {
    controllers.forEach(Controller => this.registerController(Controller));

    return this;
  }

  protected registerController (Controller: typeof AbstractActionController): this {
    this.registerInvokable(Controller, Controller);

    this.registerAlias(Controller.name, Controller);

    return this;
  }
}
