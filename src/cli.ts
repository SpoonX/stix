import path from 'path';
import stix from 'stix';

stix(require(path.resolve(process.cwd(), 'config'))).launch();
