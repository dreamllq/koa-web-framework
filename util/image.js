/**
 * Created by lvliqi on 2017/7/18.
 */
const fs = require('fs');
const path = require('path');
const config = require('../config');

const UPLOAD_TYPE_LOCAL = 1;
const UPLOAD_TYPE_CDN = 2;

let fileGenerrateUrl = async options => {
    let {type = UPLOAD_TYPE_LOCAL} = options;
    switch (type) {
        case UPLOAD_TYPE_LOCAL:
            return await fileGenerrateUrlLocal(options);
            break;
        case UPLOAD_TYPE_CDN:
            return await fileGenerrateUrlCdn(options);
            break;
        default:
            return null;
    }
};

let fileGenerrateUrlLocal = async options => {
    let {files, dir = path.join(process.cwd(), 'public/upload'), hostname = config.server_host} = options;
    let p = '/upload';

    if (typeof files == 'string') {
        files = [{path: files}];
    } else if (typeof files == 'object' && !Array.isArray(files)) {
        files = [files];
    }

    return files.map(d => {
        let filename = path.basename(d.path);
        let newDir = path.join(dir, filename);
        fs.renameSync(d.path, newDir);
        return {
            dir: newDir,
            path: `${p}/${filename}`,
            url: `${hostname}${path.join(p, filename)}`
        }
    });
};

let fileGenerrateUrlCdn = async options => {

};

module.exports.fileGenerrateUrl = fileGenerrateUrl;