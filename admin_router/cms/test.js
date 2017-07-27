/**
 * Created by lvliqi on 2017/6/20.
 */
const router = require('koa-router')();

router.get('/test', async ctx => {
    await ctx.render('admin/index')
});

module.exports = router;