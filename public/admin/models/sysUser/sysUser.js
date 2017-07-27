/**
 * Created by lvliqi on 2017/4/28.
 */
import SysApi from '../../service/sys'
import {routerRedux} from 'dva/router'
const md5 = require('md5');

export default {
    namespace: 'sysUser',
    state: {
        page: 1,
        pageSize: 10,
        total: 0,
        search: '',
        allPage: 0,
        list: [],
        loading: false,
        modelVisible: false,
        modelType: 'add',
        modelConfirmLoading: false,
        modelData: {}
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *init(_, {put, select}){
            yield put({type: 'payload', payload: {loading: true}});
            let {page, search, pageSize} = yield select(state => state.sysUser);
            let user = yield SysApi.userList({page, search, pageSize});
            yield put({
                type: 'payload',
                payload: {
                    loading: false,
                    allPage: user.data.all_page,
                    list: user.data.list,
                    total: user.data.total,
                }
            });
        },
        *submit({account, password}, {put, select}){
            yield put({type: 'payload', payload: {modelConfirmLoading: true}});
            let {modelType} = yield select(state => state.sysUser);
            if (modelType == 'add') {
                yield SysApi.userAdd({account, password: md5(password)});
                yield put({type: 'payload', payload: {modelConfirmLoading: false, modelVisible: false}})
                yield put({type: 'init'});
            }
        },
        *jumpPage(_, {put, select}){
            let {page, pageSize, search} = yield select(state => state.sysUser);
            yield put(routerRedux.push({
                pathname: location.pathname,
                query: {
                    page: page,
                    pageSize: pageSize,
                    search: search
                },
            }));
        },
        *removeUser({id}, {put, select}){
            yield SysApi.removeUser({id});
            yield put({type: 'init'});
        },
        *resetPWD({id}, {put}){
            yield SysApi.resetPasswd({id});
            successAlert('重置密码成功');
        }
    },
    subscriptions: {
        setup({history, dispatch}){
            history.listen(location => {
                if (location.pathname == '/admin/sys/user') {
                    let {query} = location;
                    let {page, search, pageSize} = query;
                    dispatch({type: 'payload', payload: {page, search, pageSize}});
                    dispatch({type: 'init'});
                }
            });
        }
    }
}