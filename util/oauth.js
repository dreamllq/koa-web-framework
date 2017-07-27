/**
 * Created by lvliqi on 2017/6/6.
 */
const OAuth = require('co-wechat-oauth');
const adminWebchatList = require('../model/adminWebchatList');
const cache = require('./RedisCache');
const co = require('co');
let pool = {};

module.exports = async id => {
    if (pool[id]) return pool[id];
    else {
        let {appid, appsecret} = await adminWebchatList.getById(id);
        let api = new OAuth(appid, appsecret, async (openid) => {
            let c = await cache.get(`${id}_${openid}_oauth_access_token`);

            try {
                return JSON.parse(c)
            } catch (err) {
                return null;
            }

        }, async (openid, token) => {
            await cache.set(`${id}_${openid}_oauth_access_token`, JSON.stringify(token));
        });
        pool[id] = api;
        return api;
    }
};