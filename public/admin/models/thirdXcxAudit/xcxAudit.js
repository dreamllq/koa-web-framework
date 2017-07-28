/**
 * Created by lvliqi on 2017/7/23.
 */
import ThirdApi from '../../service/third'
import {routerRedux} from 'dva/router'

export default {
    namespace: 'thirdXcxAudit',
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
            return {...state, ...payload};
        }
    },
    effects: {
        *init(_, {put, select}){
            yield put({type: 'payload', payload: {loading: true}});
            let {page, pageSize} = yield select(state => state.thirdXcxAudit);
            let {data} = yield ThirdApi.xcxAuditList({page, pageSize});
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
            let {page, pageSize} = yield select(state => state.thirdXcxAudit);
            yield put(routerRedux.push({
                pathname: location.pathname,
                query: {
                    page: page,
                    pageSize: pageSize
                },
            }));
        },
        *updateStatus({record}, {put, select}){
            let {appid, auditid} = record;
            yield ThirdApi.xcxAuditUpdateStatus({appid, auditid});
            successAlert('更新成功');
            yield put({type: 'init'});
        }
    },
    subscriptions: {
        setup({history, dispatch}){
            history.listen(location => {
                if (location.pathname == '/admin/third/xcx_audit') {
                    let {query} = location;
                    let {page, pageSize} = query;
                    dispatch({type: 'payload', payload: {page, pageSize}});
                    dispatch({type: 'init'});
                }
            });
        }
    }

}