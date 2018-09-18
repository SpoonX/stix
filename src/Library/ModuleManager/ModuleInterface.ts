export interface ModuleInterface {
  bootstrap?: () => void | Promise<any>;
}
