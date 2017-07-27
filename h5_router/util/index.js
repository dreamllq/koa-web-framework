/**
 * Created by lvliqi on 2017/7/18.
 */
const router = require('koa-router')();
const wxRouter = require('./wx');
const chatRouter = require('./chat');

router.use('/util', wxRouter.routes(), wxRouter.allowedMethods());
router.use('/util', chatRouter.routes(), chatRouter.allowedMethods());

module.exports = router;
