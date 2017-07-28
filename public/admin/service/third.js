/**
 * Created by lvliqi on 2017/6/2.
 */
const request = require('./request');

export default {
    xcxLists: (data) => request('/admin/third/xcx_list/lists', data, 'POST'),
    xcxUpload: (data) => request('/admin/third/xcx_list/upload_template', data, 'POST'),
    xcxModifyDomain: (data) => request('/admin/third/xcx_list/modify_domain', data, 'POST'),
    xcxBindTester: (data) => request('/admin/third/xcx_list/bind_tester', data, 'POST'),
    xcxUnbindTester: (data) => request('/admin/third/xcx_list/unbind_tester', data, 'POST'),
    xcxGetCategory: (data) => request('/admin/third/xcx_list/get_category', data, 'POST'),
    xcxGetPage: (data) => request('/admin/third/xcx_list/get_page', data, 'POST'),
    xcxSubmitAudit: (data) => request('/admin/third/xcx_list/submit_audit', data, 'POST'),
    xcxRelease: (data) => request('/admin/third/xcx_list/release', data, 'POST'),
    xcxChangeVisitstatus: (data) => request('/admin/third/xcx_list/change_visitstatus', data, 'POST'),
    xcxUpdateConfig: (data) => request('/admin/third/xcx_list/update_config', data, 'POST'),
    xcxUpdateInfo: (data) => request('/admin/third/xcx_list/update_info', data, 'POST'),

    xcxAuditList: (data) => request('/admin/third/xcx_audit/lists', data, 'POST'),
    xcxAuditUpdateStatus: (data) => request('/admin/third/xcx_audit/update_status', data, 'POST'),


}