/**
 * Created by lvliqi on 2017/5/2.
 */
const router = require('koa-router')();

router.get('/dashboard', async ctx => {
    await ctx.render('admin/index')
});


module.exports = router;