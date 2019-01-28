interface ConfigData { [key: string]: any; }

export class Config {
  private data: ConfigData = {};

  constructor (...data: Array<ConfigData>) {
    this.merge(...data);
  }

  of<T> (section: string): T {
    return this.data[section];
  }

  all (): ConfigData {
    return this.data;
  }

  merge (...toMerge: Array<Map<any, any> | ConfigData>) {
    Config.merge(this.data, ...toMerge);
  }

  static merge (...toMerge: Array<Map<any, any> | ConfigData>) {
    const target = toMerge.shift();

    toMerge.forEach(other => Config.patch(target, other));
  }

  static mergeObject (target: ConfigData, other: ConfigData) {
    Object.keys(other).reduce((baseData: ConfigData, targetKey: string) => {
      baseData[targetKey] = Config.patch(baseData[targetKey], other[targetKey]);

      return baseData;
    }, target);

    return target;
  }

  static mergeMap (target: Map<any, any>, other: Map<any, any>) {
    other.forEach((value, key) => {
      target.set(key, Config.patch(target.get(key), value));
    });

    return target;
  }

  static patch (base: any, value: any) {
    // Do not merge if either side is empty.
    if (!value || !base) {
      return value;
    }

    if (typeof value === 'object' && typeof base === 'object') {
      if (Array.isArray(value) && Array.isArray(base)) {
        value.forEach(chunk => {

          // Dedupe arrays on merge.
          if (base.indexOf(chunk) === -1) {
            base.push(chunk);
          }
        });

        return base;
      }

      if (base.constructor === Object && value.constructor === Object) {
        return Config.mergeObject(base, value);
      }
    }

    if (value instanceof Map && base instanceof Map) {
      return Config.mergeMap(base, value);
    }

    return value;
  }
}
