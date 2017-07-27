/**
 * Created by lvliqi on 2017/6/2.
 */
const router = require('koa-router')();
const uploadRouter = require('./upload');
const jsapiRouter = require('./jsapi');
const imageRouter = require('./image');

router.use('/func', uploadRouter.routes(), uploadRouter.allowedMethods());
router.use('/func', jsapiRouter.routes(), jsapiRouter.allowedMethods());
router.use('/func', imageRouter.routes(), imageRouter.allowedMethods());


module.exports = router;
