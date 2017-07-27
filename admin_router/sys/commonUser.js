/**
 * Created by lvliqi on 2017/6/14.
 */
const router = require('koa-router')();
const UserDB = require('../../model/user');

router.get('/commonUser', async ctx => {
    await ctx.render('admin/index')
});

router.post('/commonUser/lists', async ctx => {
    let {page, pageSize} = ctx.request.body;
    let data = await UserDB.getByPage({page, pageSize});
    ctx.success(data);
});

router.post('/commonUser/del', async ctx => {
    let {id} = ctx.request.body;
    await UserDB.delById(id);
    ctx.success();
});

router.post('/commonUser/ban', async ctx => {
    let {id} = ctx.request.body;
    await UserDB.banById(id);
    ctx.success();
});

router.post('/commonUser/unban', async ctx => {
    let {id} = ctx.request.body;
    await UserDB.unbanById(id);
    ctx.success();
});


module.exports = router;