/**
 * Created by lvliqi on 2017/7/25.
 */
const router = require('koa-router')();
const config = require('../config/config');
const en = require('wechat-crypto');
const xml2json = require('../util/xml2json');
const WeappAudit = require('./e/weapp_audit');

router.post(`/:appid/callback`, async ctx => {
    let AppId = ctx.request.body.xml.ToUserName[0];//小程序的原始id
    let Encrypt = ctx.request.body.xml.Encrypt[0];
    let wc = new en(config.third.token, config.third.EncryptKey, config.third.appid);
    let obj = wc.decrypt(Encrypt);
    let data = await xml2json.parseString(obj.message);
    data = data.xml;
    console.log(data);
    data.appid = ctx.params.appid;
    let {Event} = data;
    if (Event == 'weapp_audit_fail') {
        //TODO 小程序审核不通过
        await WeappAudit.fail(data)
    } else if (Event == 'weapp_audit_success') {
        //TODO 小程序审核通过
        await WeappAudit.success(data)
    }

    ctx.body = 'success';
});

module.exports = router;
