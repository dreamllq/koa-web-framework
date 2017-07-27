/**
 * Created by lvliqi on 2017/4/28.
 */

const router = require('koa-router')();
const userRouter = require('./user');
const menuRouter = require('./menu');
const dashboardRouter = require('./dashboard');
const platformRouter = require('./platform');
const rightRouter = require('./right');
const commonUserRouter = require('./commonUser');

router.get('/sys', ctx => ctx.redirect('/admin/sys/dashboard'));
router.use('/sys', dashboardRouter.routes(), dashboardRouter.allowedMethods());
router.use('/sys', userRouter.routes(), userRouter.allowedMethods());
router.use('/sys', menuRouter.routes(), menuRouter.allowedMethods());
router.use('/sys', platformRouter.routes(), platformRouter.allowedMethods());
router.use('/sys', rightRouter.routes(), rightRouter.allowedMethods());
router.use('/sys', commonUserRouter.routes(), commonUserRouter.allowedMethods());

module.exports = router;