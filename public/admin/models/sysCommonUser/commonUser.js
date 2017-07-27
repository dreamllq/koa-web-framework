/**
 * Created by lvliqi on 2017/6/13.
 */
import sysApi from '../../service/sys'
import {routerRedux} from 'dva/router'

export default {
    namespace: 'sysCommonUser',
    state: {
        loadEnd: false,
        page: 1,
        pageSize: 10,
        total: 0,
        allPage: 0,
        list: [],
        loading: false,
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload}
        }
    },
    effects: {
        *init(_, {put, select}){
            yield put({type: 'payload', payload: {loading: true}});
            let {page, pageSize} = yield select(state => state.sysCommonUser);
            let {data} = yield sysApi.commonUserList({page, pageSize});
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
            let {page, pageSize} = yield select(state => state.wechatShortLink);
            yield put(routerRedux.push({
                pathname: location.pathname,
                query: {
                    page: page,
                    pageSize: pageSize
                },
            }));
        },
        *del({id}, {put, select}){
            yield sysApi.commonUserDel({id});
            yield put({type: 'init'});
        },
        *ban({id}, {put}){
            yield sysApi.commonUserBan({id});
            yield put({type: 'init'});
        },
        *unban({id}, {put}){
            yield sysApi.commonUserUnBan({id});
            yield put({type: 'init'});
        }
    },
    subscriptions: {
        setup({history, dispatch}){
            history.listen(location => {
                if (location.pathname == '/admin/sys/commonUser') {
                    let {query} = location;
                    let {page, pageSize} = query;
                    dispatch({type: 'payload', payload: {page, pageSize}});
                    dispatch({type: 'init'});
                }
            });
        }
    }
}