/**
 * Created by lvliqi on 2017/7/21.
 */
const router = require('koa-router')();
const en = require('wechat-crypto');
const config = require('../config/config');
const xml2json = require('../util/xml2json');
const redis = require('../util/RedisCache');
const key_component_verify_ticket = 'third_component_verify_ticket';
const AuthorizedHandle = require('./e/authorized');
const Unauthorized = require('./e/unauthorized');
const UpdateAuthorized = require('./e/UpdateAuthorized');

router.post('/event', async ctx => {
    let AppId = ctx.request.body.xml.AppId[0];
    let Encrypt = ctx.request.body.xml.Encrypt[0];
    let wc = new en(config.third.token, config.third.EncryptKey, AppId);
    let obj = wc.decrypt(Encrypt);
    let data = await xml2json.parseString(obj.message);
    data = data.xml;
    console.log(data);
    let {InfoType} = data;
    if (InfoType == 'component_verify_ticket') {
        if (data.AppId == config.third.appid) {
            await redis.set(key_component_verify_ticket, data.ComponentVerifyTicket);
        }
    } else if (InfoType == 'unauthorized') {
        //TODO 取消授权通知
        await Unauthorized(data);
    } else if (InfoType == 'authorized') {
        //TODO 授权成功通知
        await AuthorizedHandle(data);
    } else if (InfoType == 'updateauthorized') {
        //TODO 授权更新通知
        await UpdateAuthorized(data);
    }

    ctx.body = 'success';
});

module.exports = router;