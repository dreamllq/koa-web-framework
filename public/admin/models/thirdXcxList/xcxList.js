/**
 * Created by lvliqi on 2017/7/22.
 */
import ThirdApi from '../../service/third'
import {routerRedux} from 'dva/router'

export default {
    namespace: 'thirdXcxList',
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
            let {page, pageSize} = yield select(state => state.thirdXcxList);
            let {data} = yield ThirdApi.xcxLists({page, pageSize});
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
            let {page, pageSize} = yield select(state => state.thirdXcxList);
            yield put(routerRedux.push({
                pathname: location.pathname,
                query: {
                    page: page,
                    pageSize: pageSize
                },
            }));
        },
        *release({record}, {put}){
            let {appid} = record;
            yield ThirdApi.xcxRelease({
                appid
            });
            successAlert('操作成功');
        },
        *open({record}, {put}){
            let {appid} = record;
            yield ThirdApi.xcxChangeVisitstatus({appid, action: 'open'});
            successAlert('操作成功');
        },
        *close({record}, {put}){
            let {appid} = record;
            yield ThirdApi.xcxChangeVisitstatus({appid, action: 'close'});
            successAlert('操作成功');
        },
        *update_info({record}){
            let {appid} = record;
            yield ThirdApi.xcxUpdateInfo({appid});
            successAlert('操作成功');
        }
    },
    subscriptions: {
        setup({history, dispatch}){
            history.listen(location => {
                if (location.pathname == '/admin/third/xcx_list') {
                    let {query} = location;
                    let {page, pageSize} = query;
                    dispatch({type: 'payload', payload: {page, pageSize}});
                    dispatch({type: 'init'});
                }
            });
        }
    }

}