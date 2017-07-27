/**
 * Created by lvliqi on 2017/6/12.
 */
require('../bin/www');
const co = require('co');
const redis = require('../util/RedisCache');
const WxMaterial = require('../model/wxMaterial');

const apis = require('../util/wechat');
let arguments = process.argv.splice(2);
let [id, type] = arguments;
let api;
let offset = 0;
let count = 20;


const TASK_SUCCESS = 1;
const TASK_LOADING = 2;
const TASK_ERROR = 3;

let doTask = async () => {
    api = await apis(id);
    await WxMaterial.clear(type);
    await clearRedis();
    await getMaterials();
    await redis2Mysql();
};

let clearRedis = async () => {
    let count = await redis.get(`wx_material_${type}_count`);
    for (let i = 0; i < count; i++) {
        await redis.del(`wx_material_${type}_${i + 1}`);
    }
    await redis.del(`wx_material_${type}_count`);
    await redis.del(`wx_material_${type}_status`);
    await redis.del(`wx_material_${type}_error`);
};

let getMaterials = async () => {
    let data = await api.getMaterials(type, offset, count);
    if (Buffer.isBuffer(data))
        data = JSON.parse(data.toString());

    if (data.errcode) {
        throw new Error(data.errmsg);
    }

    let {item, total_count, item_count} = data;

    for (let i = 0; i < item_count; i++) {
        if (i + offset < total_count) {
            await saveRedis(item[i]);
        }
    }

    if (item_count == 20) {
        offset += item_count;
        await getMaterials();
    }
};

let saveRedis = async (item) => {
    let d = await redis.incr(`wx_material_${type}_count`);
    await redis.set(`wx_material_${type}_${d}`, JSON.stringify(item));
};

let redis2Mysql = async () => {
    let count = await redis.get(`wx_material_${type}_count`);
    for (let i = 0; i < count; i++) {
        let d = await redis.get(`wx_material_${type}_${i + 1}`);
        d = JSON.parse(d);
        await saveMysql(d);
    }
};

let saveMysql = async (d) => {
    await WxMaterial.insert({
        type,
        media_id: d.media_id,
        data: JSON.stringify(d)
    });
};


/**
 * 完成后操作
 */
let onSuccess = async () => {
    await clearRedis();
    await redis.set(`wx_material_${type}_status`, TASK_SUCCESS);
    console.log('all done');
};

let onError = async (err) => {
    await clearRedis();
    await redis.set(`wx_material_${type}_status`, TASK_ERROR);
    await redis.set(`wx_material_${type}_error`, err.message);
    console.log(err);
};

co(doTask()).then(async () => {
    await onSuccess();
}).catch(async err => {
    await onError(err);
}).then(() => {
    process.exit();
});