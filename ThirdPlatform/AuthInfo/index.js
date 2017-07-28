/**
 * Created by lvliqi on 2017/7/21.
 */
const config = require('../../config/config');
const request = require('../http');
const Token = require('../AccessToken');

const api_get_authorizer_info = `${config.third.api.host}/component/api_get_authorizer_info`;
const api_get_authorizer_option = `${config.third.api.host}/component/api_get_authorizer_option`;
const api_set_authorizer_option = `${config.third.api.host}/component/api_set_authorizer_option`;

let AuthInfo = async (authorizer_appid) => {
    let token = await Token.GetComponentToken();
    let result = await request.doPost({
        url: `${api_get_authorizer_info}?component_access_token=${token}`,
        data: {
            component_appid: config.third.appid,
            authorizer_appid: authorizer_appid
        }
    });
    if (result.errcode) {
        throw new Error(`errformat::api_component_token::${result.errcode}::${result.errmsg}`);
    }
    return result;
};


let AuthOption = async (authorizer_appid, option_name) => {
    let token = await Token.GetComponentToken();
    let result = await request.doPost({
        url: `${api_get_authorizer_option}?component_access_token=${token}`,
        data: {
            component_appid: config.third.appid,
            authorizer_appid: authorizer_appid,
            option_name: option_name
        }
    });
    if (result.errcode) {
        throw new Error(`errformat::api_component_token::${result.errcode}::${result.errmsg}`);
    }
    return result;
};

let SetAuthOption = async (authorizer_appid, option_name, option_value) => {
    let token = await Token.GetComponentToken();
    let result = await request.doPost({
        url: `${api_set_authorizer_option}?component_access_token=${token}`,
        data: {
            component_appid: config.third.appid,
            authorizer_appid: authorizer_appid,
            option_name: option_name,
            option_value: option_value
        }
    });
    if (result.errcode) {
        throw new Error(`errformat::api_component_token::${result.errcode}::${result.errmsg}`);
    }
    return result;
};


module.exports.AuthInfo = AuthInfo;
module.exports.AuthOption = AuthOption;
module.exports.SetAuthOption = SetAuthOption;
