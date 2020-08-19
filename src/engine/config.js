import fs from 'fs';

const batchConfPath = '../../batch.config.json';
// Get path with the sign: @, the config file batch.config.jsons is under root dir.
export const getSignPath = (path) => {
    if(typeof path !== "string") {
        throw Error;
    }
    const batchConf = JSON.parse(fs.readFileSync(batchConfPath, {encoding: 'utf-8'}));
    return batchConf["@"] + path;
};
// Get config, the formate of the file should be JSON.
export function config(path) {
    const _path = path.includes('@') ? getSignPath(path): path;

    fs.readFile(_path,(err, data) => {
        if(typeof data !== "string") {
            throw Error;
        }
        return JSON.parse(data);
    })
}