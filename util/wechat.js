/**
 * Created by lvliqi on 2017/6/2.
 */
const WechatAPI = require('co-wechat-api');
const adminWebchatList = require('../model/adminWebchatList');
const cache = require('./RedisCache');
let pool = {};

module.exports = async id => {
    if (pool[id]) return pool[id];
    else {
        let {appid, appsecret} = await adminWebchatList.getById(id);
        let api = new WechatAPI(appid, appsecret, async () => {
            let c = await cache.get(`${id}_access_token`);
            try {
                return JSON.parse(c);
            } catch (err) {
                return ''
            }
        }, async (token) => {
            await cache.set(`${id}_access_token`, JSON.stringify(token));
        });

        api.registerTicketHandle(async (type) => {
            let c = await cache.get(`${id}_${type}_ticket_token`);
            try {
                return JSON.parse(c);
            } catch (err) {
                return ''
            }
        }, async (type, ticketToken) => {
            await cache.set(`${id}_${type}_ticket_token`, JSON.stringify(ticketToken));
        });

        pool[id] = api;
        return api;
    }
};