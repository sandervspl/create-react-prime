import util from 'util';
import fs from 'fs';
import cp from 'child_process';


export default class Util {
  asyncExec = util.promisify(cp.exec);
  asyncWriteFile = util.promisify(fs.writeFile);
}
