/**
 * Created by lvliqi on 2017/6/2.
 */
import wechatApi from '../../service/webchat'
import {routerRedux} from 'dva/router'

export default {
    namespace: 'wechatSetting',
    state: {
        loadEnd: false,
        page: 1,
        pageSize: 10,
        total: 0,
        search: '',
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
        *init(_, {select, put}){
            yield put({type: 'payload', payload: {loading: true}});
            let {page, pageSize} = yield select(state => state.wechatSetting);
            let {data} = yield wechatApi.wechatList({page, pageSize});
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
            let {page, pageSize} = yield select(state => state.wechatSetting);
            yield put(routerRedux.push({
                pathname: location.pathname,
                query: {
                    page: page,
                    pageSize: pageSize
                },
            }));
        },
        *del({id}, {put}){
            yield wechatApi.wechatDel({id});
            yield put({type: 'init'});
        },
        *setDefault({id}, {put}){
            yield wechatApi.wechatSetDefault({id});
            yield put({type: 'init'});
        }
    },
    subscriptions: {
        setup({history, dispatch}){
            history.listen(location => {
                if (location.pathname == '/admin/wechat/baseSetting') {
                    let {query} = location;
                    let {page, search, pageSize} = query;
                    dispatch({type: 'payload', payload: {page, search, pageSize}});
                    dispatch({type: 'init'});
                }
            });
        }
    }
}