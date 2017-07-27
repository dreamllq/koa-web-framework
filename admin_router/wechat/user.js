/**
 * Created by lvliqi on 2017/6/2.
 */
const router = require('koa-router')();
const adminWechatList = require('../../model/adminWebchatList');
const WxUser = require('../../model/wxUser');
const apis = require('../../util/wechat');
const child_process = require('child_process');
const path = require('path');
const redis = require('../../util/RedisCache');

router.get('/user', async ctx => {
    await ctx.render('admin/index')
});

/**
 * 公众号用户列表--分页逻辑
 */
router.post('/user/lists', async ctx => {
    let {page, pageSize} = ctx.request.body;
    let data = await WxUser.getByPage({page, pageSize});
    ctx.success(data);
});

/**
 * 修改用户备注
 */
router.post('/user/set_remark', async ctx => {
    let {remark, id} = ctx.request.body;
    let wechat = await adminWechatList.getDefault();
    let api = await apis(wechat.id);
    let user = await WxUser.getById(id);
    await api.updateRemark(user.openid, remark);
    await WxUser.updateById({id, data: {remark: remark}});
    ctx.success();
});

/**
 * 同步用户列表
 */
router.post('/user/async_users', async ctx => {
    let wechat = await adminWechatList.getDefault();
    await redis.set('wx_user_info_status', 2);
    child_process.fork(path.join(process.cwd(), 'task/syncWechatUser'), [wechat.id], {silent: true});
    ctx.success();
});

router.post('/user/async_users_status', async ctx => {
    let status = await redis.get('wx_user_info_status');
    let error = await redis.get('wx_user_info_error');
    ctx.success({status, error});
});

router.post('/user/clear_async_user_status', async ctx => {
    await redis.del('wx_user_info_status');
    await redis.del('wx_user_info_error');
    ctx.success();
});


module.exports = router;