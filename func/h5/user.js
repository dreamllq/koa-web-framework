/**
 * Created by lvliqi on 2017/6/6.
 */
const md5 = require('md5');
const userDB = require('../../model/user');
const wxUser = require('../../model/wxUser');
const redis = require('../../util/RedisCache');
const uuid = require('uuid');

const USER_DEFAULT_HEADER = '/images/default/wx_default_header.jpg';

let wxRegist = async ({account = uuid.v1(), password = md5(uuid.v1()), nickname = '游客', cover = USER_DEFAULT_HEADER, unionid}) => {
    await userDB.insert({account, password, nickname, cover, wx_unionid: unionid})
};

let wxLogin = async (unionid) => {
    let user = await userDB.getByUnionid(unionid);
    let token = `${user.wx_unionid}::${md5(user.account)}::${md5(user.password)}`;
    await redis.set(token, JSON.stringify(user));
    return {uid: user.id, token};
};

let wxQuickLogin = async ({ctx, unionid}) => {
    let user = await userDB.getByUnionid(unionid);
    if (!user) {
        let wx_user = await wxUser.getByUnionid(unionid);
        await wxRegist({
            nickname: wx_user.nickname,
            cover: wx_user.headimgurl,
            unionid
        });
    }

    let loginTicket = await wxLogin(unionid);
    ctx.cookies.set('token', loginTicket.token, {maxAge: 3 * 30 * 24 * 60 * 60 * 1000});
    ctx.cookies.set('uid', loginTicket.uid, {maxAge: 3 * 30 * 24 * 60 * 60 * 1000});
};

module.exports.wxRegist = wxRegist;
module.exports.wxLogin = wxLogin;
module.exports.wxQuickLogin = wxQuickLogin;