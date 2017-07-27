/**
 * Created by lvliqi on 2017/6/2.
 */
const router = require('koa-router')();
const adminWebchatList = require('../../model/adminWebchatList');

router.get('/baseSetting', async ctx => {
    await ctx.render('admin/index')
});

/**
 * 公众号列表--分页逻辑
 */
router.post('/baseSetting/lists', async ctx => {
    let {page, pageSize} = ctx.request.body;
    let data = await adminWebchatList.getByPage({page, pageSize});
    ctx.success(data);
});


router.post('/baseSetting/add', async ctx => {
    let {name, appid, appsecret} = ctx.request.body;
    await adminWebchatList.insert({name, appid, appsecret});
    ctx.success();
});


router.post('/baseSetting/del', async ctx => {
    let {id} = ctx.request.body;
    await adminWebchatList.delById(id);
    ctx.success();
});

router.post('/baseSetting/edit', async ctx => {
    let {id, name, appid, appsecret} = ctx.request.body;
    await adminWebchatList.updateById({id, data: {name, appid, appsecret}});
    ctx.success();
});

router.post('/baseSetting/setDefault', async ctx => {
    let {id} = ctx.request.body;
    await adminWebchatList.update({data: {is_default: 0}, where: '1=1'});
    await adminWebchatList.updateById({id, data: {is_default: 1}});
    ctx.success();
});

module.exports = router;