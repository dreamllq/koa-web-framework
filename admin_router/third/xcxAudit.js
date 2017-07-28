/**
 * Created by lvliqi on 2017/7/23.
 */
const router = require('koa-router')();
const ThXcxAuditStatus = require('../../model/thXcxAuditStatus');
const ThirdPlatform = require('../../ThirdPlatform');

router.get('/xcx_audit', async ctx => {
    await ctx.render('admin/index')
});

router.post('/xcx_audit/lists', async ctx => {
    let {page, pageSize} = ctx.request.body;
    let data = await ThXcxAuditStatus.getByPage({page, pageSize});
    ctx.success(data);
});

router.post('/xcx_audit/update_status', async ctx => {
    let {appid, auditid} = ctx.request.body;
    let result = await ThirdPlatform.Xcx.GetAuditstatus(appid, {auditid});
    let {status, reason = ''} = result;
    await ThXcxAuditStatus.updateByAuditid({
        auditid,
        data: {
            status, reason
        }
    });
    ctx.success();
});

module.exports = router;
