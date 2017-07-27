/**
 * Created by lvliqi on 2017/6/2.
 */
const request = require('./request');

export default {
    wechatList: (data) => request('/admin/wechat/baseSetting/lists', data, 'POST'),
    wechatAdd: (data) => request('/admin/wechat/baseSetting/add', data, 'POST'),
    wechatDel: (data) => request('/admin/wechat/baseSetting/del', data, 'POST'),
    wechatEdit: (data) => request('/admin/wechat/baseSetting/edit', data, 'POST'),
    wechatSetDefault: (data) => request('/admin/wechat/baseSetting/setDefault', data, 'POST'),

    wechatUserList: (data) => request('/admin/wechat/user/lists', data, 'POST'),
    wechatUserSetRemark: (data) => request('/admin/wechat/user/set_remark', data, 'POST'),
    wechatUserAsyncUsers: (data) => request('/admin/wechat/user/async_users', data, 'POST'),
    wechatUserAsyncUsersStatus: (data) => request('/admin/wechat/user/async_users_status', data, 'POST'),
    wechatUserClearAsyncUsersStatus: (data) => request('/admin/wechat/user/clear_async_user_status', data, 'POST'),

    wechatUGroupAsync: (data) => request('/admin/wechat/ugroup/async_group', data, 'POST'),
    wechatUGroupList: (data) => request('/admin/wechat/ugroup/lists', data, 'POST'),
    wechatUGroupAdd: (data) => request('/admin/wechat/ugroup/add', data, 'POST'),
    wechatUGroupUpdate: (data) => request('/admin/wechat/ugroup/update', data, 'POST'),
    wechatUGroupRemove: (data) => request('/admin/wechat/ugroup/remove', data, 'POST'),
    wechatUGroupMoveUserToGroup: (data) => request('/admin/wechat/ugroup/moveUserToGroup', data, 'POST'),


    wechatMaterialList: (data) => request('/admin/wechat/material/lists', data, 'POST'),
    wechatMaterialImageUpload: (data) => request('/admin/wechat/material/image/upload', data, 'POST'),


    wechatQrcodeList: (data) => request('/admin/wechat/qrcode/lists', data, 'POST'),
    wechatQrcodeYJSave: (data) => request('/admin/wechat/qrcode/yj/save', data, 'POST'),
    wechatQrcodeLSSave: (data) => request('/admin/wechat/qrcode/ls/save', data, 'POST'),
    wechatQrcodeDel: (data) => request('/admin/wechat/qrcode/del', data, 'POST'),


    wechatShortLinkList: (data) => request('/admin/wechat/shortLink/lists', data, 'POST'),
    wechatShortSet: (data) => request('/admin/wechat/shortLink/set', data, 'POST'),
    wechatShortDel: (data) => request('/admin/wechat/shortLink/del', data, 'POST'),
}