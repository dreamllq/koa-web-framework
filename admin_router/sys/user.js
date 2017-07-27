/**
 * Created by lvliqi on 2017/4/28.
 */
const router = require('koa-router')();
const adminUser = require('../../model/adminUser');
const adminRightGroup = require('../../model/adminRightGroup');
const adminUserRight = require('../../model/adminUserRight');
const errcode = require('../../config/errcode');
const md5 = require('md5');

router.get('/user', async ctx => {
    await ctx.render('admin/index')
});

router.post('/user/list', async ctx => {
    let page = ctx.request.body.page;
    let pageSize = ctx.request.body.pageSize;
    let search = ctx.request.body.search || '';
    let data = await adminUser.getByPage({page, pageSize, where: `account like '%${search}%' and account<>'admin'`});
    ctx.success(data);
});

router.post('/user/add', async ctx => {
    await adminUser.insert({
        account: ctx.request.body.account,
        password: ctx.request.body.password,
    });
    ctx.success();
});

/**
 * 修改用户权限分组
 */
router.post('/user/edit_user_right', async ctx => {
    let {uid, rgid} = ctx.request.body;
    let user = adminUser.getById(uid);
    if (!user) {
        ctx.error(errcode.NO_UID);
        return;
    }

    let right_group = adminRightGroup.getById(rgid);
    if (!right_group) {
        ctx.error(errcode.NO_RGID);
        return;
    }

    let user_right = await adminUserRight.getByUid(uid);

    if (!user_right) {
        await adminUserRight.insert({uid, rgid});
        ctx.success();
    } else {
        await adminUserRight.update({
            where: `uid=${uid}`,
            data: {rgid}
        });
        ctx.success();
    }
});

/**
 * 获取用户权限分组
 */
router.post('/user/get_user_right', async ctx => {
    let {uid} = ctx.request.body;
    let user = adminUser.getById(uid);
    if (!user) {
        ctx.error(errcode.NO_UID);
        return;
    }

    let user_right = await adminUserRight.getByUid(uid);

    ctx.success(user_right);
});

/**
 * 重置密码
 */
router.post('/user/reset_passwd', async ctx => {
    let {id} = ctx.request.body;
    let pwd = md5('123456');
    await adminUser.update({where: `id=${id}`, data: {password: pwd}});
    ctx.success();
});

router.post('/user/remove_user', async ctx => {
    let {id} = ctx.request.body;
    await adminUser.delById(id);
    ctx.success();
});


module.exports = router;