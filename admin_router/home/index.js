/**
 * Created by lvliqi on 2017/4/27.
 */
const router = require('koa-router')();
const db = require('../../util/MysqlDB');

router.get('/home', async ctx => {
    await ctx.render('admin/index')
});

router.get('/home/index', async ctx => {
    console.log(111);
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    let row = await db.query('select * from test');
    ctx.body = row;
});

module.exports = router;