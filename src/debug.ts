import debug from 'debug';

export const createDebugLogger = (namespace: string, project: string = 'stix:'): debug.IDebugger => debug(project + namespace);
