/**
 * Created by lvliqi on 2017/6/2.
 * 同步微信用户
 */
require('../bin/www');
const co = require('co');
const redis = require('../util/RedisCache');
const WxUser = require('../model/wxUser');

const apis = require('../util/wechat');
let arguments = process.argv.splice(2);
let [id] = arguments;
let openids = [];
let api;

const TASK_SUCCESS = 1;
const TASK_LOADING = 2;
const TASK_ERROR = 3;

/**
 * redis key
 *          wx_user_info_count
 *          wx_user_info_xxx
 *          wx_user_info_status
 *          wx_user_info_error
 */

let doTask = async () => {
    api = await apis(id);
    await clearRedis();
    console.log('clear redis done');
    console.log('get openid list begin');
    await getFollowers();
    console.log('get openid list done');
    console.log('get user by openid begin');
    await getAllUserInfo();
    console.log('get user by openid done');
    console.log('save user from to mysql begin');
    await redis2Mysql();
    console.log('save user from to mysql done');
};

let clearRedis = async () => {
    let count = await redis.get('wx_user_info_count');
    for (let i = 0; i < count; i++) {
        await redis.del(`wx_user_info_${i}`);
    }
    await redis.del(`wx_user_info_count`);
    await redis.del('wx_user_info_status');
    await redis.del('wx_user_info_error');
};

let getFollowers = async (next_openid = null) => {
    await redis.set('wx_user_info_status', TASK_LOADING);

    let l;
    if (next_openid) {
        l = await api.getFollowers(next_openid);
    } else {
        l = await api.getFollowers();
    }
    if (l.count > 0) {
        openids = [...openids, ...l.data.openid];
        await getFollowers(l.next_openid);
    }
};

let getAllUserInfo = async () => {
    for (let i = 0; i < openids.length; i++) {
        console.log(`get user ${openids[i]} ${i + 1}/${openids.length} begin`);
        await getOneUserAndSave(openids[i]);
        console.log(`get user ${openids[i]} ${i + 1}/${openids.length} done`);
    }
};

let getOneUserAndSave = async (openid) => {
    let user = await api.getUser(openid);
    await saveRedis(user);
};

/**
 * 用户数据保存到redis
 */
let saveRedis = async (user) => {
    let d = await redis.incr('wx_user_info_count');
    await redis.set(`wx_user_info_${d - 1}`, JSON.stringify(user));
};

let redis2Mysql = async () => {
    let count = await redis.get('wx_user_info_count');
    for (let i = 0; i < count; i++) {
        console.log(`save from redis to mysql ${i + 1}/${count} begin`);
        let d = await redis.get(`wx_user_info_${i}`);
        d = JSON.parse(d);
        await saveMysql(d);
        console.log(`save from redis to mysql ${i + 1}/${count} end`);
    }
};

let saveMysql = async (user) => {
    let {openid} = user;
    let wu = await WxUser.getByOpenid(openid);
    if (wu) {
        await WxUser.updateByOpenid(openid, user);
    } else {
        user.wechat_id = id;
        await WxUser.insert(user);
    }
};

/**
 * 完成后操作
 */
let onSuccess = async () => {
    await clearRedis();
    await redis.set('wx_user_info_status', TASK_SUCCESS);
    console.log('all done');
};

let onError = async (err) => {
    await clearRedis();
    await redis.set('wx_user_info_status', TASK_ERROR);
    await redis.set('wx_user_info_error', err.message);
    console.log(err);
};

co(doTask()).then(async () => {
    await onSuccess();
}).catch(async err => {
    await onError(err);
}).then(() => {
    process.exit();
});