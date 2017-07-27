/**
 * Created by lvliqi on 2017/6/6.
 */
import wechatApi from '../../service/webchat'
import {routerRedux} from 'dva/router'

export default {
    namespace: 'wechatUser',
    state: {
        loadEnd: false,
        page: 1,
        pageSize: 10,
        total: 0,
        search: '',
        allPage: 0,
        list: [],
        loading: false,
        asyncStatus: 0,
        asyncError: '',
        groups: []
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload}
        }
    },
    effects: {
        *init(_, {select, put}){
            yield put({type: 'payload', payload: {loading: true}});
            let {page, pageSize} = yield select(state => state.wechatUser);
            let {data} = yield wechatApi.wechatUserList({page, pageSize});
            yield put({
                type: 'payload',
                payload: {
                    loading: false,
                    allPage: data.all_page,
                    list: data.list,
                    total: data.total,
                }
            });
        },
        *jumpPage(_, {put, select}){
            let {page, pageSize} = yield select(state => state.wechatUser);
            yield put(routerRedux.push({
                pathname: location.pathname,
                query: {
                    page: page,
                    pageSize: pageSize
                },
            }));
        },
        *asyncUser(_, {put}){
            yield wechatApi.wechatUserAsyncUsers();
            yield put({type: 'asyncUserStatus'});
        },
        *asyncUserStatus(_, {put}){
            let data = yield wechatApi.wechatUserAsyncUsersStatus();
            let {status, error} = data.data;
            yield put({type: 'payload', payload: {asyncStatus: status, asyncError: error}});
        },
        *claarAsyncUserStatus(_, {put}){
            yield wechatApi.wechatUserClearAsyncUsersStatus();
            yield put({type: 'asyncUserStatus'});
        },
        *getGroups(_, {put}){
            let groups = yield wechatApi.wechatUGroupList();
            yield put({
                type: 'payload',
                payload: {
                    groups: groups.data
                }
            });
        },
        *moveUserToGroup({gid, openid}, {put}){
            yield wechatApi.wechatUGroupMoveUserToGroup({id: gid, openid});
            yield put({type: 'init'});
        }
    },
    subscriptions: {
        setup({history, dispatch}){
            history.listen(location => {
                if (location.pathname == '/admin/wechat/user') {
                    let {query} = location;
                    let {page, search, pageSize} = query;
                    dispatch({type: 'getGroups'});
                    dispatch({type: 'payload', payload: {page, search, pageSize}});
                    dispatch({type: 'init'});
                    dispatch({type: 'asyncUserStatus'});
                }
            });
        }
    }

}