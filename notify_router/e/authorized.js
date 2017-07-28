/**
 * Created by lvliqi on 2017/7/21.
 */
const ThirdPlatform = require('../../ThirdPlatform');
const ThXcxList = require('../../model/thXcxList');
const base64 = require('../../util/base64');

let handle = async (eventData) => {
    let {AppId, AuthorizerAppid, AuthorizationCode, CreateTime, AuthorizationCodeExpiredTime} = eventData;
    let data = await ThirdPlatform.AuthInfo.AuthInfo(AuthorizerAppid);
    console.log(data);
    let {authorizer_info, authorization_info} = data;
    let {nick_name, head_img, service_type_info, verify_type_info, user_name, signature, principal_name, business_info, qrcode_url, MiniProgramInfo} = authorizer_info;
    let {func_info} = authorization_info;
    if (!MiniProgramInfo) {
        throw new Error('非小程序');
    }
    await ThXcxList.insert({
        appid: AuthorizerAppid,
        nickname: nick_name,
        head_img,
        service_type_info: JSON.stringify(service_type_info),
        verify_type_info: JSON.stringify(verify_type_info),
        user_name,
        signature,
        principal_name,
        business_info: JSON.stringify(business_info),
        qrcode_url,
        func_info: JSON.stringify(func_info)
    });
    await ThirdPlatform.QueryAuth.GetQueryAuth(AuthorizationCode);
};

module.exports = handle;