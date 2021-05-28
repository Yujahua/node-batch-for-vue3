"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = config;
exports.getSignPath = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const batchConfPath = '../../batch.config.json'; // Get path with the sign: @, the config file batch.config.jsons is under root dir.

const getSignPath = path => {
  if (typeof path !== "string") {
    throw Error;
  }

  const batchConf = JSON.parse(_fs.default.readFileSync(batchConfPath, {
    encoding: 'utf-8'
  }));
  return batchConf["@"] + path;
}; // Get config, the formate of the file should be JSON.


exports.getSignPath = getSignPath;

function config(path) {
  const _path = path.includes('@') ? getSignPath(path) : path;

  _fs.default.readFile(_path, (err, data) => {
    if (typeof data !== "string") {
      throw Error;
    }

    return JSON.parse(data);
  });
}