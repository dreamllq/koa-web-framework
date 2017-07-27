/**
 * Created by lvliqi on 2017/4/27.
 */
const router = require('koa-router')();
const homeRouter = require('./home');
const sysRouter = require('./sys');
const loginRouter = require('./login');
const wechatRouter = require('./wechat');
const cmsRouter = require('./cms');

router.use('/admin', async (ctx, next) => {
    if (['/admin/login', '/admin/login/check', '/admin/login/login'].indexOf(ctx.request.url) > -1) {
        await next();
    } else {
        let {user} = ctx.session;

        if (!user || user == {}) {
            ctx.redirect('/admin/login');
        } else {
            await next();
        }
    }
});

router.use('/admin', require('./mid/auth'));

router.get('/admin', ctx => ctx.redirect('/admin/sys'));
router.use('/admin', homeRouter.routes(), homeRouter.allowedMethods());
router.use('/admin', sysRouter.routes(), sysRouter.allowedMethods());
router.use('/admin', wechatRouter.routes(), wechatRouter.allowedMethods());
router.use('/admin', cmsRouter.routes(), cmsRouter.allowedMethods());
router.use('/admin', loginRouter.routes(), loginRouter.allowedMethods());
router.get('/admin/active', ctx => ctx.render('admin/index'));

module.exports = router;
