/**
 * Created by lvliqi on 2017/7/21.
 */
const config = require('../../config/config');
const redis = require('../../util/RedisCache');
const request = require('../http');


const api_component_token = `${config.third.api.host}/component/api_component_token`;
const key_component_verify_ticket = 'third_component_verify_ticket';
const key_component_token = 'third_component_token';

let ApiComponentTonen = async () => {
    let component_verify_ticket = await redis.get(key_component_verify_ticket);
    if (!component_verify_ticket) {
        throw new Error(`errformat::api_component_token::-2::key_component_verify_ticket not exist`);
    }

    let result = await request.doPost({
        url: api_component_token,
        data: {
            component_appid: config.third.appid,
            component_appsecret: config.third.appsecret,
            component_verify_ticket: component_verify_ticket
        }
    });
    if (result.errcode) {
        throw new Error(`errformat::api_component_token::${result.errcode}::${result.errmsg}`);
    }
    return result;
};

let _getToken = async () => {
    let token = await redis.get(key_component_token);
    try {
        token = JSON.parse(token);
    } catch (e) {
        token = null;
    }

    return token;
};

let _setToken = async (token) => {
    await redis.set(key_component_token, JSON.stringify(token));
};

let _regetToken = async () => {
    let token = await ApiComponentTonen();
    token.expires_in = ((token.expires_in - 100) * 1000) + Date.now();
    await _setToken(token);
    return token.component_access_token;
};

let GetComponentToken = async () => {
    let token = await _getToken();
    if (token) {
        if (Date.now() > token.expires_in) {
            return await _regetToken();
        } else {
            return token.component_access_token;
        }
    } else {
        return await _regetToken();
    }
};

module.exports.GetComponentToken = GetComponentToken;
