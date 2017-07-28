/**
 * Created by lvliqi on 2017/7/21.
 */
const config = require('../../config/config');
const request = require('../http');
const Token = require('../AccessToken');

const api_pre_auth_code = `${config.third.api.host}/component/api_create_preauthcode`;

let PreAuthCode = async () => {
    let token = await Token.GetComponentToken();
    let result = await request.doPost({
        url: `${api_pre_auth_code}?component_access_token=${token}`,
        data: {
            component_appid: config.third.appid,
        }
    });
    if (result.errcode) {
        throw new Error(`errformat::api_component_token::${result.errcode}::${result.errmsg}`);
    }
    return result;
};


let GetPreAuthCode = async () => {
    let token = await PreAuthCode();
    return token.pre_auth_code;
};

let getAuthUrl = async (redirect_uri) => {
    let pre_auth_code = await GetPreAuthCode();
    let url = `https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid=${config.third.appid}&pre_auth_code=${pre_auth_code}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
    return url;
};

module.exports.GetPreAuthCode = GetPreAuthCode;
module.exports.getAuthUrl = getAuthUrl;
