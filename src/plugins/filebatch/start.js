/**
 * run
 */
import vBat from './filebatch'

const map = ["../../test/origin"];
const source = map[0];
const targets = "../../test/dist";

const vb = vBat();
// VB.setIgnore(['.DS_Store','folders',]);
// VB.tempSetOn(true);

export const start = () => vb.run(source, targets);



/**
 * clear
 */

// const _targets = __dirname + '/../targets';
// const newPages = _targets + '/pages';
// const newTemp = _targets + '/temp';

// VB.rmdirSync(_targets);

// VB.mkdirSync(_targets);
// VB.mkdirSync(newPages);
// VB.mkdirSync(newTemp);
// VB.log(`targets已清空!`);
