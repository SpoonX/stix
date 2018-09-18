import debug from 'debug';

export default (namespace: string, project: string = 'stix:'): debug.IDebugger => debug(project + namespace);
