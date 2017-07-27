/**
 * Created by lvliqi on 2017/6/20.
 */
const router = require('koa-router')();
const testUserRouter = require('./test');
const editorUserRouter = require('./editor');

router.use('/cms', testUserRouter.routes(), testUserRouter.allowedMethods());
router.use('/cms', editorUserRouter.routes(), editorUserRouter.allowedMethods());

module.exports = router;