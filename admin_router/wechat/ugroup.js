/**
 * Created by lvliqi on 2017/6/6.
 */
const router = require('koa-router')();
const apis = require('../../util/wechat');
const adminWechatList = require('../../model/adminWebchatList');
const wxUserGroup = require('../../model/wxUserGroups');
const wxUser = require('../../model/wxUser');
const errcode = require('../../config/errcode');

router.get('/ugroup', async ctx => {
    await ctx.render('admin/index')
});

router.post('/ugroup/async_group', async ctx => {
    let wechat = await adminWechatList.getDefault();
    let api = await apis(wechat.id);
    let {groups} = await api.getGroups();
    await wxUserGroup.truncate();
    for (let i = 0; i < groups.length; i++) {
        let {id, name, count} = groups[i];
        await wxUserGroup.insert({
            gid: id,
            name, count,
            wechat_id: wechat.id
        });
    }
    ctx.success();
});

router.post('/ugroup/lists', async ctx => {
    let list = await wxUserGroup.getAllList();
    ctx.success(list);
});

router.post('/ugroup/add', async ctx => {
    let {name} = ctx.request.body;
    let wechat = await adminWechatList.getDefault();
    let api = await apis(wechat.id);
    let {group} = await api.createGroup(name);
    await wxUserGroup.insert({
        gid: group.id,
        name: group.name,
        count: 0
    });
    ctx.success();
});

router.post('/ugroup/update', async ctx => {
    let {id, name} = ctx.request.body;
    let wechat = await adminWechatList.getDefault();
    let api = await apis(wechat.id);
    let {errcode, errmsg} = await api.updateGroup(id, name);
    if (errcode == 0) {
        await wxUserGroup.updateByGid({id, data: {name}});
        ctx.success();
    } else {
        ctx.error({
            errno: errcode,
            errdesc: errmsg
        });
    }

});

router.post('/ugroup/remove', async ctx => {
    let {id} = ctx.request.body;
    let wechat = await adminWechatList.getDefault();
    let api = await apis(wechat.id);
    let {errcode, errmsg} = await api.removeGroup(id);
    if (errcode == 0) {
        await wxUserGroup.deleteByGid(id);
        ctx.success();
    } else {
        ctx.error({
            errno: errcode,
            errdesc: errmsg
        });
    }
});

router.post('/ugroup/moveUserToGroup', async ctx => {
    let {id, openid} = ctx.request.body;
    let wechat = await adminWechatList.getDefault();
    let api = await apis(wechat.id);
    let {errcode, errmsg} = await api.moveUserToGroup(openid, id);
    if (errcode == 0) {
        await wxUser.updateByOpenid(openid, {groupid: id});
        ctx.success();
    } else {
        ctx.error({
            errno: errcode,
            errdesc: errmsg
        });
    }
});
module.exports = router;