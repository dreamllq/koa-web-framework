/**
 * Created by lvliqi on 2017/6/13.
 */
const router = require('koa-router')();
const WxQrcode = require('../../model/wxQrcode');
const adminWechatList = require('../../model/adminWebchatList');
const apis = require('../../util/wechat');
const errcode = require('../../config/errcode');

router.get('/qrcode', async ctx => {
    await ctx.render('admin/index')
});

router.post('/qrcode/lists', async ctx => {
    let {page, pageSize} = ctx.request.body;
    let data = await WxQrcode.getByPage({page, pageSize});
    ctx.success(data);
});

/**
 * 永久二维码
 */
router.post('/qrcode/yj/save', async ctx => {
    let {sceneId} = ctx.request.body;
    let qrcode = await WxQrcode.getOne({where: `type=1 and sceneId=${sceneId}`});
    if (qrcode) {
        ctx.error(errcode.HAS_YJ_QRCODE);
        return;
    }

    let wechat = await adminWechatList.getDefault();
    let api = await apis(wechat.id);
    let d = await api.createLimitQRCode(sceneId);
    console.log(d);
    let {ticket} = d;
    let url = api.showQRCodeURL(ticket);

    await WxQrcode.insert({
        wechat_id: wechat.id,
        type: 1,
        sceneId,
        ticket,
        url
    });
    ctx.success();
});

/**
 * 临时二维码
 */
router.post('/qrcode/ls/save', async ctx => {
    let {sceneId, expire} = ctx.request.body;
    let wechat = await adminWechatList.getDefault();
    let api = await apis(wechat.id);
    let d = await api.createTmpQRCode(sceneId, expire);
    console.log(d);
    let {ticket, expire_seconds} = d;
    let url = api.showQRCodeURL(ticket);

    await WxQrcode.insert({
        wechat_id: wechat.id,
        type: 2,
        sceneId,
        ticket,
        url,
        expire_seconds
    });
    ctx.success();
});

router.post('/qrcode/del', async ctx => {
    let {id} = ctx.request.body;
    await WxQrcode.delById(id);
    ctx.success();
});


module.exports = router;