/**
 * Created by lvliqi on 2017/5/15.
 */
import SysApi from '../../service/sys'
import {routerRedux} from 'dva/router'

export default {
    namespace: 'sysRight',
    state: {
        page: 1,
        pageSize: 10,
        list: [],
        allPage: 0,
        total: 0,
        loading: false,
        groupModelVisible: false,
        groupModelType: 'add',
        groupModelConfirmLoading: false,
        groupModelData: {}
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *init(_, {put, select}){
            yield put({type: 'payload', payload: {loading: true}});
            let {page, pageSize} = yield select(state => state.sysRight);
            let {data} = yield SysApi.rightList({page, pageSize});
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
            let {page, pageSize} = yield select(state => state.sysRight);
            yield put(routerRedux.push({
                pathname: location.pathname,
                query: {
                    page: page,
                    pageSize: pageSize
                },
            }));
        },
        *groupHandle({data}, {put, select}){
            let {groupModelData, groupModelType} = yield select(state => state.sysRight);

            if (groupModelType == 'add') {
                let {name} = data;
                yield put({type: 'payload', payload: {groupModelConfirmLoading: true}});
                yield SysApi.addGroup({name});
                yield put({type: 'payload', payload: {groupModelConfirmLoading: false, groupModelVisible: false}});
                yield put({type: 'init'});
            } else {
                let {name} = data;
                let {id} = groupModelData;
                yield put({type: 'payload', payload: {groupModelConfirmLoading: true}});
                yield SysApi.editGroup({name, id});
                yield put({type: 'payload', payload: {groupModelConfirmLoading: false, groupModelVisible: false}});
                yield put({type: 'init'});
            }
        },
        *removeGroup({id}, {put, select}){
            yield SysApi.removeGroup({id});
            yield put({type: 'init'});
        }
    },
    subscriptions: {
        setup({history, dispatch}){
            history.listen(location => {
                if (location.pathname == '/admin/sys/right') {
                    let {query} = location;
                    let {page, pageSize} = query;
                    dispatch({type: 'payload', payload: {page, pageSize}});
                    dispatch({type: 'init'});
                }
            });
        }
    }
}