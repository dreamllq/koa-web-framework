/**
 * Created by lvliqi on 2017/6/2.
 */
const router = require('koa-router')();
const xcxListRouter = require('./xcxList');
const xcxAuditRouter = require('./xcxAudit');
const xcxSettingRouter = require('./xcxSetting');

router.get('/third', ctx => ctx.redirect('/admin/third/xcx_list'));
router.use('/third', xcxListRouter.routes(), xcxListRouter.allowedMethods());
router.use('/third', xcxAuditRouter.routes(), xcxAuditRouter.allowedMethods());
router.use('/third', xcxSettingRouter.routes(), xcxSettingRouter.allowedMethods());

module.exports = router;
