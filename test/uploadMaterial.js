/**
 * Created by lvliqi on 2017/6/12.
 */
require('../bin/www');
const apis = require('../util/wechat');
const co = require('co');


let filepath = '/Users/lvliqi/Documents/git/red-girl/public/upload/GwddvJwztJzhxaf-Xai2x6Pk.png';

let dofunc = async () => {
    let api = await apis(2);
    // let data = await api.uploadMaterial(filepath, 'image');
    let data = await api.getMaterials('image', 0, 20);
    // let data = await api.removeMaterial('pBuVo4iV5b_Sgbj2yVthnfOX87jHelhXgN2qFI4_nZY');
    console.log(JSON.parse(data.toString()));
};

co(dofunc());