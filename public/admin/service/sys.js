/**
 * Created by lvliqi on 2017/5/2.
 */
const request = require('./request');
///
export default {
    loginCheck: (data) => request('/admin/login/check', data, 'POST'),
    login: (data) => request('/admin/login/login', data, 'POST'),
    logout: (data) => request('/admin/login/logout', data, 'POST'),

    menuList: (data) => request('/admin/sys/menu/list', data, 'POST'),
    userList: (data) => request('/admin/sys/user/list', data, 'POST'),
    userAdd: (data) => request('/admin/sys/user/add', data, 'POST'),
    getUserRight: (data) => request('/admin/sys/user/get_user_right', data, 'POST'),
    editUserRight: (data) => request('/admin/sys/user/edit_user_right', data, 'POST'),
    removeUser: (data) => request('/admin/sys/user/remove_user', data, 'POST'),
    resetPasswd: (data) => request('/admin/sys/user/reset_passwd', data, 'POST'),


    rightList: (data) => request('/admin/sys/right/group_list', data, 'POST'),
    addGroup: (data) => request('/admin/sys/right/add_group', data, 'POST'),
    editGroup: (data) => request('/admin/sys/right/edit_group', data, 'POST'),
    groupDetailInfo: (data) => request('/admin/sys/right/group_detail_info', data, 'POST'),
    allRightList: (data) => request('/admin/sys/right/all_right_list', data, 'POST'),
    addGroupDetail: (data) => request('/admin/sys/right/add_group_detail', data, 'POST'),
    groupAllList: (data) => request('/admin/sys/right/group_all_list', data, 'POST'),
    removeGroup: (data) => request('/admin/sys/right/remove_group', data, 'POST'),

    commonUserList: (data) => request('/admin/sys/commonUser/lists', data, 'POST'),
    commonUserDel: (data) => request('/admin/sys/commonUser/del', data, 'POST'),
    commonUserBan: (data) => request('/admin/sys/commonUser/ban', data, 'POST'),
    commonUserUnBan: (data) => request('/admin/sys/commonUser/unban', data, 'POST'),
}