/**
 * Created by lvliqi on 2017/6/6.
 */
const redis = require('../../util/RedisCache');
const adminWebchatList = require('../../model/adminWebchatList');
const wxUser = require('../../model/wxUser');
const userDB = require('../../model/user');
const oauthApis = require('../../util/oauth');
const Q = require('q');
const co = require('co');
const base64 = require('../../util/base64');
const uuid = require('uuid');
const userFunc = require('../../func/h5/user');

/**
 * cookie:
 * token 用户信息在redis中的key
 * uid 用户信息
 */
module.exports = async (ctx, next) => {
    let token = ctx.cookies.get('token');
    let uid = ctx.cookies.get('uid');
    let {code, state, cb_url} = ctx.query;
    if (cb_url)
        cb_url = base64.decode(cb_url);
    const scope = "snsapi_userinfo";
    let url = ctx.href;

    let user = await redis.get(token);
    user = JSON.parse(user);
    if (user) {
        let u = await userDB.getById(user.id);
        if (u) {
            await next();
            return;
        } else {
            ctx.cookies.set('token', '', {maxAge: -1});
            ctx.cookies.set('uid', '', {maxAge: -1});
        }
    }

    let {id} = await adminWebchatList.getDefault();
    let api = await oauthApis(id);

    if (code && state == ctx.session.oAuthState) {
        let user = await api.getUserByCode(code);
        if (!user.unionid) {
            user.unionid = user.openid
        }
        user.wechat_id = id;
        await wxUser.saveUpdate(user);
        await userFunc.wxQuickLogin({ctx, unionid: user.unionid});
        ctx.redirect(cb_url);
        return;
    }

    let state_id = uuid.v1();
    ctx.session.oAuthState = state_id;
    url += url.indexOf('?') > -1 ? '&' : '?';
    url += `cb_url=${base64.encode(ctx.href)}`;
    let redirecturl = api.getAuthorizeURL(url, state_id, scope);
    ctx.redirect(redirecturl);
};
