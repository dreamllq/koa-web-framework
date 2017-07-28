/**
 * Created by lvliqi on 2017/7/21.
 */
const config = require('../../config/config');
const request = require('../http');
const Token = require('../AccessToken');
const ThXcxList = require('../../model/thXcxList');

const api_query_auth = `${config.third.api.host}/component/api_query_auth`;
const api_authorizer_token = `${config.third.api.host}/component/api_authorizer_token`;
const key_authorizer_token = 'key_authorizer_token';

//获取调用凭据 和 小程序信息
let QueryAuth = async (auth_code) => {
    let token = await Token.GetComponentToken();
    let result = await request.doPost({
        url: `${api_query_auth}?component_access_token=${token}`,
        data: {
            component_appid: config.third.appid,
            authorization_code: auth_code
        }
    });
    if (result.errcode) {
        throw new Error(`errformat::api_component_token::${result.errcode}::${result.errmsg}`);
    }
    return result;
};


let AuthorizerToken = async (authorizer_appid, authorizer_refresh_token) => {
    let token = await Token.GetComponentToken();
    let result = await request.doPost({
        url: `${api_authorizer_token}?component_access_token=${token}`,
        data: {
            component_appid: config.third.appid,
            "authorizer_appid": authorizer_appid,
            "authorizer_refresh_token": authorizer_refresh_token,
        }
    });
    if (result.errcode) {
        throw new Error(`errformat::api_component_token::${result.errcode}::${result.errmsg}`);
    }
    return result;
};

let _getToken = async (authorizer_appid) => {
    // let token = await redis.get(`${key_authorizer_token}_${authorizer_appid}`);
    // try {
    //     token = JSON.parse(token);
    // } catch (e) {
    //     token = null;
    // }
    //
    // return token;
    let token = await ThXcxList.getByAppid(authorizer_appid);
    if (!token) return null;
    let {access_token, refresh_token, expires_in} = token;
    return {
        authorizer_access_token: access_token,
        authorizer_refresh_token: refresh_token,
        expires_in: parseInt(expires_in)
    }
};

let _setToken = async (token, authorizer_appid) => {
    await ThXcxList.updataByAppid({
        appid: authorizer_appid,
        data: {
            access_token: token.authorizer_access_token,
            refresh_token: token.authorizer_refresh_token,
            expires_in: token.expires_in
        }
    })

    // await redis.set(`${key_authorizer_token}_${authorizer_appid}`, JSON.stringify(token));
};

let _regetToken = async (authorizer_appid, authorizer_refresh_token) => {
    let auth_token = await AuthorizerToken(authorizer_appid, authorizer_refresh_token);
    auth_token.expires_in = ((auth_token.expires_in - 30) * 1000) + Date.now();
    await _setToken(auth_token, authorizer_appid);
    return auth_token.authorizer_access_token;
};

let GetAuthorizerToken = async (authorizer_appid) => {
    let token = await _getToken(authorizer_appid);
    if (token) {
        if (Date.now() > token.expires_in) {
            return await _regetToken(authorizer_appid, token.authorizer_refresh_token);
        } else {
            return token.authorizer_access_token;
        }
    } else {
        throw new Error('此小程序需要授权');
    }
};

let GetQueryAuth = async (auth_code) => {
    let query_auth = await QueryAuth(auth_code);
    let {authorization_info} = query_auth;
    let {authorizer_appid, authorizer_access_token, expires_in, authorizer_refresh_token} = authorization_info;
    await _setToken({
        authorizer_access_token: authorizer_access_token,
        authorizer_refresh_token: authorizer_refresh_token,
        expires_in: ((expires_in - 100) * 1000) + Date.now()
    }, authorizer_appid);
    return authorization_info;
};

module.exports.GetAuthorizerToken = GetAuthorizerToken;
module.exports.GetQueryAuth = GetQueryAuth;