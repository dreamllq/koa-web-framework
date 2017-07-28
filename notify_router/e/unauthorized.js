/**
 * Created by lvliqi on 2017/7/21.
 */
const ThirdPlatform = require('../../ThirdPlatform');
const ThXcxList = require('../../model/thXcxList');

let handle = async (eventData) => {
    let {AppId, AuthorizerAppid, AuthorizationCode, CreateTime, AuthorizationCodeExpiredTime} = eventData;
    await ThXcxList.delByAppid(AuthorizerAppid);
};

module.exports = handle;