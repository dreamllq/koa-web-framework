/**
 * Created by lvliqi on 2017/3/10.
 */
const router = require('koa-router')();
const userDB = require('../model/user');
const userFunc = require('../func/h5/user');

const homeRouter = require('./home');
const utilRouter = require('./util');
const userRouter = require('./user');

router.use('/h5', homeRouter.routes(), homeRouter.allowedMethods());
router.use('/h5', utilRouter.routes(), utilRouter.allowedMethods());
router.use('/h5', userRouter.routes(), userRouter.allowedMethods());
router.get('/h5/set_cookie', async ctx => {
    let {id} = ctx.request.query;
    let u = await userDB.getById(id);
    await userFunc.wxQuickLogin({ctx, unionid: u.wx_unionid});
    ctx.success();
});

module.exports = router;