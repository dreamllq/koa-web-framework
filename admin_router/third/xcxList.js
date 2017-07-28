/**
 * Created by lvliqi on 2017/7/22.
 */
const router = require('koa-router')();
const ThXcxList = require('../../model/thXcxList');
const ThirdPlatform = require('../../ThirdPlatform');
const ThXcxAuditStatus = require('../../model/thXcxAuditStatus');

router.get('/xcx_list', async ctx => {
    await ctx.render('admin/index')
});

router.post('/xcx_list/lists', async ctx => {
    let {page, pageSize} = ctx.request.body;
    let data = await ThXcxList.getByPage({page, pageSize});
    ctx.success(data);
});

router.post('/xcx_list/modify_domain', async ctx => {
    let {action, requestdomain, wsrequestdomain, uploaddomain, downloaddomain, appid} = ctx.request.body;
    let result = await ThirdPlatform.Xcx.ModifyDomain(appid, {action, requestdomain, wsrequestdomain, uploaddomain, downloaddomain});
    ctx.success(result);
});

router.post('/xcx_list/bind_tester', async ctx => {
    let {appid, wechatid} = ctx.request.body;
    await ThirdPlatform.Xcx.BindTester(appid, {wechatid});
    ctx.success();
});

router.post('/xcx_list/unbind_tester', async ctx => {
    let {appid, wechatid} = ctx.request.body;
    await ThirdPlatform.Xcx.UnbindTester(appid, {wechatid});
    ctx.success();
});

router.post('/xcx_list/upload_template', async ctx => {
    let {template_id, user_desc, user_version, appid} = ctx.request.body;
    let xcx_data = await ThXcxList.getByAppid(appid);
    await ThirdPlatform.Xcx.Comment(appid, {
        template_id, user_desc, user_version,
        ext_json: {
            extAppid: appid,
            ext: {
                project_key: xcx_data.project_key,
                api_host: xcx_data.api_host
            }
        }
    });
    ctx.success();
});

router.post('/xcx_list/get_category', async ctx => {
    let {appid} = ctx.request.body;
    let data = await ThirdPlatform.Xcx.GetCategory(appid);
    ctx.success(data);
});

router.post('/xcx_list/get_page', async ctx => {
    let {appid} = ctx.request.body;
    let data = await ThirdPlatform.Xcx.GetPage(appid);
    ctx.success(data);
});

router.post('/xcx_list/submit_audit', async ctx => {
    let {appid, item_list} = ctx.request.body;
    item_list = item_list.map(d => {
        d.tag = d.tag.split(',').join(' ');
        return d;
    });

    let data = await ThirdPlatform.Xcx.SubmitAudit(appid, item_list);
    let {auditid} = data;
    await ThXcxAuditStatus.insert({
        auditid,
        appid,
        page: '',
        tag: '',
        title: '',
        status: 2,
        info: JSON.stringify(item_list)
    });
    ctx.success(data);
});

router.post('/xcx_list/release', async ctx => {
    let {appid} = ctx.request.body;
    await ThirdPlatform.Xcx.Release(appid);
    ctx.success();
});

router.post('/xcx_list/change_visitstatus', async ctx => {
    let {appid, action} = ctx.request.body;
    await ThirdPlatform.Xcx.ChangeVisitstatus(appid, {action});
    ctx.success();
});

router.post('/xcx_list/update_config', async ctx => {
    let {appid, project_key, api_host} = ctx.request.body;
    await ThXcxList.updataByAppid({
        appid,
        data: {
            project_key, api_host
        }
    });
    ctx.success();
});

router.post('/xcx_list/update_info', async ctx => {
    let {appid} = ctx.request.body;
    let data = await ThirdPlatform.AuthInfo.AuthInfo(appid);

    let {authorizer_info, authorization_info} = data;
    let {nick_name, head_img, service_type_info, verify_type_info, user_name, signature, principal_name, business_info, qrcode_url, MiniProgramInfo} = authorizer_info;
    let {func_info} = authorization_info;

    await ThXcxList.updataByAppid({
        appid: appid,
        data: {
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
        }
    });
    ctx.success();
});

module.exports = router;
