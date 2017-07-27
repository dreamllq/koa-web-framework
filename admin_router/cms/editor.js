/**
 * Created by lvliqi on 2017/6/20.
 */
const router = require('koa-router')();

router.get('/editor', async ctx => {
    await ctx.render('admin/index')
});

module.exports = router;