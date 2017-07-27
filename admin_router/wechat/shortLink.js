/**
 * Created by lvliqi on 2017/6/13.
 */
const router = require('koa-router')();
const WxShortLink = require('../../model/wxShortLink');
const adminWechatList = require('../../model/adminWebchatList');
const apis = require('../../util/wechat');

router.get('/shortLink', async ctx => {
    await ctx.render('admin/index')
});

router.post('/shortLink/lists', async ctx => {
    let {page, pageSize} = ctx.request.body;
    let data = await WxShortLink.getByPage({page, pageSize});
    ctx.success(data);
});

router.post('/shortLink/set', async ctx => {
    let {link} = ctx.request.body;
    let wechat = await adminWechatList.getDefault();
    let api = await apis(wechat.id);
    let d = await api.shorturl(link);
    console.log(d);
    if (d.errcode) {
        ctx.error({
            errno: d.errcode,
            errdesc: d.errmsg
        })
    } else {
        let {short_url} = d;
        await WxShortLink.insert({
            wechat_id: wechat.id,
            link,
            short_link: short_url
        });
        ctx.success();
    }
});


router.post('/shortLink/del', async ctx => {
    let {id} = ctx.request.body;
    await WxShortLink.delById(id);
    ctx.success();

});

module.exports = router;