"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _filebatch = _interopRequireDefault(require("./filebatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * run
 */
const map = ["../../test/origin"];
const source = map[0];
const targets = "../../test/dist";
const vb = (0, _filebatch.default)(); // VB.setIgnore(['.DS_Store','folders',]);
// VB.tempSetOn(true);

const start = () => vb.run(source, targets);
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


exports.start = start;