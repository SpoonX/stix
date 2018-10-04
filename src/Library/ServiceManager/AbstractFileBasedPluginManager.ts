import fs from 'fs';
import path from 'path';
import { FileBasedPluginType, ServiceManagerConfigType } from '.';
import { ServiceManager, AbstractPluginManager } from '../ServiceManager';
import { Instantiable } from '../Core';

export class AbstractFileBasedPluginManager extends AbstractPluginManager {
  constructor (creationContext: ServiceManager, locations: string[], config: ServiceManagerConfigType) {
    super(creationContext, config);

    if (locations) {
      this.loadFromLocations(locations);
    }
  }

  public static getPluginName (plugin: FileBasedPluginType): string {
    if (typeof plugin === 'string') {
      return plugin;
    }

    return plugin.name;
  }

  public loadFromLocations (pluginDirectories?: string[]): this {
    if (pluginDirectories) {
      pluginDirectories.forEach(directory => this.loadDirectory(directory));
    }

    return this;
  }

  public loadDirectory (pluginDirectory: string) {
    const plugins: Array<Instantiable<Object>> = fs.readdirSync(pluginDirectory)
      .filter((fileName: string) => !!fileName.match(/^(?!.*index\.(js|ts)$).*[^.]d\.(js|ts)$/))
      .map((fileName: string) => fileName.replace(/\.(js|ts)$/, ''))
      .map((plugin: string) => {
        const Plugin = require(path.resolve(pluginDirectory, plugin));

        if (typeof Plugin === 'function') {
          return Plugin;
        }

        if (typeof Plugin.default === 'function') {
          return Plugin.default;
        }

        if (typeof Plugin[plugin] === 'function') {
          return Plugin[plugin];
        }

        throw new TypeError(`Unable to load plugin "${plugin}" due to missing constructable export.`);
      });

    this.registerPlugins(plugins);
  }

  public getPlugin (plugin: Instantiable<Object>): Object {
    return this.get(plugin);
  }

  protected registerPlugins (plugins: Array<Instantiable<Object>>): this {
    plugins.forEach(Plugin => this.registerPlugin(Plugin));

    return this;
  }

  protected registerPlugin (Plugin: Instantiable<Object>): this {
    this.registerInvokable(Plugin, Plugin);

    this.registerAlias(Plugin.name, Plugin);

    return this;
  }
}
