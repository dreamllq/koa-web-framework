/**
 * Created by lvliqi on 2017/7/21.
 */
const router = require('koa-router')();
const eventRouter = require('./event');
const platformRouter = require('./platform');

router.use('/notify', eventRouter.routes(), eventRouter.allowedMethods());
router.use('/platform', platformRouter.routes(), platformRouter.allowedMethods());


module.exports = router;
