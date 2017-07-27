/**
 * Created by lvliqi on 2017/6/2.
 */
const router = require('koa-router')();
const baseSettingRouter = require('./baseSetting');
const userRouter = require('./user');
const ugroupRouter = require('./ugroup');
const materialRouter = require('./material');
const qrcodeRouter = require('./qrcode');
const massRouter = require('./mass');
const shortLinkRouter = require('./shortLink');
const menuRouter = require('./menu');
const kfRouter = require('./kf');

router.get('/wechat', ctx => ctx.redirect('/admin/wechat/baseSetting'));
router.use('/wechat', baseSettingRouter.routes(), baseSettingRouter.allowedMethods());
router.use('/wechat', userRouter.routes(), userRouter.allowedMethods());
router.use('/wechat', ugroupRouter.routes(), ugroupRouter.allowedMethods());
router.use('/wechat', materialRouter.routes(), materialRouter.allowedMethods());
router.use('/wechat', qrcodeRouter.routes(), qrcodeRouter.allowedMethods());
router.use('/wechat', massRouter.routes(), massRouter.allowedMethods());
router.use('/wechat', shortLinkRouter.routes(), shortLinkRouter.allowedMethods());
router.use('/wechat', menuRouter.routes(), menuRouter.allowedMethods());
router.use('/wechat', kfRouter.routes(), kfRouter.allowedMethods());

module.exports = router;
