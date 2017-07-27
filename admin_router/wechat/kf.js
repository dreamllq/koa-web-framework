/**
 * Created by lvliqi on 2017/6/13.
 */
const router = require('koa-router')();

router.get('/kf', async ctx => {
    await ctx.render('admin/index')
});

module.exports = router;