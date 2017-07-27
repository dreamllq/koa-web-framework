/**
 * Created by lvliqi on 2017/6/7.
 */
const router = require('koa-router')();
const apis = require('../../util/wechat');
const adminWechatList = require('../../model/adminWebchatList');
const wxMaterial = require('../../model/wxMaterial');
const path = require('path');
const querystring = require('querystring');
const url = require('url');

router.get('/material', async ctx => {
    await ctx.render('admin/index')
});
router.post('/material/lists', async ctx => {
    // let wechat = await adminWechatList.getDefault();
    // let api = await apis(wechat.id);
    let {page, pageSize, type} = ctx.request.body;
    let data = await wxMaterial.getByPage({page, pageSize, type});
    ctx.success(data);
});


router.post('/material/image/upload', async ctx => {
    let {type, filepath} = ctx.request.body;
    let wechat = await adminWechatList.getDefault();
    let api = await apis(wechat.id);
    let data = await api.uploadMaterial(filepath, type);
    if (Buffer.isBuffer(data))
        data = JSON.parse(data.toString());
    await wxMaterial.insert({
        wechat_id: wechat.id,
        type: 'image',
        media_id: data.media_id,
        data: JSON.stringify(data),
        name: `${data.media_id}.${querystring.parse(url.parse(data.url).query).wx_fmt}`
    });
    ctx.success();
});

router.post('/material/image/async', async ctx => {
    let wechat = await adminWechatList.getDefault();
    let api = await apis(wechat.id);
    let data = await api.getMaterials('image', 0, 20);
    if (Buffer.isBuffer(data))
        data = JSON.parse(data.toString());

    console.log(data);
    ctx.success(data);
});

module.exports = router;