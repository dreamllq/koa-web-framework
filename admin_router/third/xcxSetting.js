/**
 * Created by lvliqi on 2017/7/23.
 */
const router = require('koa-router')();

router.get('/xcx_setting',async ctx=>{
    await ctx.render('admin/index')
});

module.exports = router;