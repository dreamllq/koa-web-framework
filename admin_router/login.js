/**
 * Created by lvliqi on 2017/5/26.
 */
const router = require('koa-router')();
const adminUser = require('../model/adminUser');
const admin_user_right = require('../model/adminUserRight');
const errcode = require('../config/errcode');

router.get('/login', async ctx => {
    await ctx.render('admin/index')
});

router.post('/login/check', async ctx => {
    let user = ctx.session.user;
    if (user) {
        ctx.success(user);
    } else {
        ctx.success(false);
    }
});

router.post('/login/login', async ctx => {
    let {username, password} = ctx.request.body;
    let user = await adminUser.getList({where: `account='${username}' and password='${password}'`});
    if (user.length == 0) {
        ctx.error(errcode.LOGIN_FAIL);
    } else {
        let userRight = await admin_user_right.getList({where: `uid=${user[0].id}`});
        if (userRight.length == 0) {
            return ctx.error(errcode.NO_CONFIG_RIGHT);
        }

        ctx.session.user = user[0];
        ctx.success(true)
    }
});

router.post('/login/logout', async ctx => {
    ctx.session.user = null;
    ctx.success();
});

module.exports = router;