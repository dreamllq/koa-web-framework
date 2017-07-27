/**
 * Created by lvliqi on 2017/4/27.
 */
const router = require('koa-router')();
const db = require('../../util/MysqlDB');

router.use('/personal', require('../mid/oauth2'));

/**
 * cookie:
 * token 用户信息在redis中的key
 * uid 用户信息
 */
router.get('/home', async ctx => {

    await ctx.render('h5/a');
});

router.get('/home/index', async ctx => {
    console.log(111);
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    let row = await db.query('select * from test');
    ctx.body = row;
});

module.exports = router;