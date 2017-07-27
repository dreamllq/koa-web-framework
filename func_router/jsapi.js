/**
 * Created by lvliqi on 2017/6/13.
 */
const router = require('koa-router')();
const apis = require('../util/wechat');
const adminWechatList = require('../model/adminWebchatList');

router.post('/jsapi/config', async ctx => {
    let {
        debug = false,
        jsApiList = [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
        ],
        url
    } = ctx.request.body;
    let wechat = await adminWechatList.getDefault();
    let api = await apis(wechat.id);
    let config = await api.getJsConfig({debug, jsApiList, url});
    ctx.success(config);
});

module.exports = router;