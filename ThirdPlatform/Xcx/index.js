/**
 * Created by lvliqi on 2017/7/22.
 */
const config = require('../../config/config');
const redis = require('../../util/RedisCache');
const request = require('../http');
const Token = require('../AccessToken');
const AuthToken = require('../QueryAuth');

const modify_domain = `${config.third.api.xcx_host}/modify_domain`; //修改小程序域名
const bind_tester = `${config.third.api.xcx_host}/bind_tester`; //绑定微信用户为小程序体验者
const unbind_tester = `${config.third.api.xcx_host}/unbind_tester`; //解除绑定小程序的体验者
const commit = `${config.third.api.xcx_host}/commit`; //为授权的小程序帐号上传小程序代码
const get_qrcode = `${config.third.api.xcx_host}/get_qrcode`; //获取体验小程序的体验二维码
const get_category = `${config.third.api.xcx_host}/get_category`; //获取授权小程序帐号的可选类目
const get_page = `${config.third.api.xcx_host}/get_page`; //获取小程序的第三方提交代码的页面配置（仅供第三方开发者代小程序调用）
const submit_audit = `${config.third.api.xcx_host}/submit_audit`; //将第三方提交的代码包提交审核（仅供第三方开发者代小程序调用）
const get_auditstatus = `${config.third.api.xcx_host}/get_auditstatus`; //查询某个指定版本的审核状态（仅供第三方代小程序调用）
const get_latest_auditstatus = `${config.third.api.xcx_host}/get_latest_auditstatus`; //查询最新一次提交的审核状态（仅供第三方代小程序调用）
const release = `${config.third.api.xcx_host}/release`; //发布已通过审核的小程序（仅供第三方代小程序调用）
const change_visitstatus = `${config.third.api.xcx_host}/change_visitstatus`; //修改小程序线上代码的可见状态（仅供第三方代小程序调用）


let ModifyDomain = async (authorizer_appid, {action = 'get', requestdomain = [], wsrequestdomain = [], uploaddomain = [], downloaddomain = []}) => {
    let token = await AuthToken.GetAuthorizerToken(authorizer_appid);
    let result = await request.doPost({
        url: `${modify_domain}?access_token=${token}`,
        data: {
            action, requestdomain, wsrequestdomain, uploaddomain, downloaddomain
        }
    });
    if (result.errcode) {
        throw new Error(`errformat::modify_domain::${result.errcode}::${result.errmsg}`);
    }
    return result;
};

let BindTester = async (authorizer_appid, {wechatid}) => {
    let token = await AuthToken.GetAuthorizerToken(authorizer_appid);
    let result = await request.doPost({
        url: `${bind_tester}?access_token=${token}`,
        data: {
            wechatid
        }
    });
    if (result.errcode) {
        throw new Error(`errformat::bind_tester::${result.errcode}::${result.errmsg}`);
    }
    return result;
};


let UnbindTester = async (authorizer_appid, {wechatid}) => {
    let token = await AuthToken.GetAuthorizerToken(authorizer_appid);
    let result = await request.doPost({
        url: `${unbind_tester}?access_token=${token}`,
        data: {
            wechatid
        }
    });
    if (result.errcode) {
        throw new Error(`errformat::unbind_tester::${result.errcode}::${result.errmsg}`);
    }
    return result;
};

let Comment = async (authorizer_appid, {template_id, ext_json = {}, user_version = 'v1.0', user_desc = 'test'}) => {
    let token = await AuthToken.GetAuthorizerToken(authorizer_appid);
    let result = await request.doPost({
        url: `${commit}?access_token=${token}`,
        data: {
            template_id, ext_json: JSON.stringify(ext_json), user_version, user_desc
        }
    });
    if (result.errcode) {
        throw new Error(`errformat::commit::${result.errcode}::${result.errmsg}`);
    }
    return result;
};

let GetQrcodeUrl = async (authorizer_appid) => {
    let token = await AuthToken.GetAuthorizerToken(authorizer_appid);
    return `${get_qrcode}?access_token=${token}`;
};

let GetCategory = async (authorizer_appid) => {
    let token = await AuthToken.GetAuthorizerToken(authorizer_appid);
    let result = await request.doGet({
        url: `${get_category}?access_token=${token}`,
        data: {}
    });
    if (result.errcode) {
        throw new Error(`errformat::get_category::${result.errcode}::${result.errmsg}`);
    }
    return result;
};

let GetPage = async (authorizer_appid) => {
    let token = await AuthToken.GetAuthorizerToken(authorizer_appid);
    let result = await request.doGet({
        url: `${get_page}?access_token=${token}`,
        data: {}
    });
    if (result.errcode) {
        throw new Error(`errformat::get_page::${result.errcode}::${result.errmsg}`);
    }
    return result;
};

let SubmitAudit = async (authorizer_appid, item_list) => {
    let token = await AuthToken.GetAuthorizerToken(authorizer_appid);
    let result = await request.doPost({
        url: `${submit_audit}?access_token=${token}`,
        data: {
            item_list: item_list
        }
    });
    if (result.errcode) {
        throw new Error(`errformat::submit_audit::${result.errcode}::${result.errmsg}`);
    }
    return result;
};

let GetAuditstatus = async (authorizer_appid, {auditid}) => {
    let token = await AuthToken.GetAuthorizerToken(authorizer_appid);
    let result = await request.doPost({
        url: `${get_auditstatus}?access_token=${token}`,
        data: {
            auditid
        }
    });
    if (result.errcode) {
        throw new Error(`errformat::get_auditstatus::${result.errcode}::${result.errmsg}`);
    }
    return result;
};

let Release = async (authorizer_appid) => {
    let token = await AuthToken.GetAuthorizerToken(authorizer_appid);
    let result = await request.doPost({
        url: `${release}?access_token=${token}`,
        data: {}
    });
    if (result.errcode) {
        throw new Error(`errformat::release::${result.errcode}::${result.errmsg}`);
    }
    return result;
};


let ChangeVisitstatus = async (authorizer_appid, {action}) => {
    let token = await AuthToken.GetAuthorizerToken(authorizer_appid);
    let result = await request.doPost({
        url: `${change_visitstatus}?access_token=${token}`,
        data: {action}
    });
    if (result.errcode) {
        throw new Error(`errformat::change_visitstatus::${result.errcode}::${result.errmsg}`);
    }
    return result;
};

module.exports.ModifyDomain = ModifyDomain;
module.exports.BindTester = BindTester;
module.exports.UnbindTester = UnbindTester;
module.exports.Comment = Comment;
module.exports.GetQrcodeUrl = GetQrcodeUrl;
module.exports.GetCategory = GetCategory;
module.exports.GetPage = GetPage;
module.exports.SubmitAudit = SubmitAudit;
module.exports.GetAuditstatus = GetAuditstatus;
module.exports.Release = Release;
module.exports.ChangeVisitstatus = ChangeVisitstatus;

