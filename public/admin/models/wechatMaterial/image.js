/**
 * Created by lvliqi on 2017/6/7.
 */
import wechatApi from '../../service/webchat'
import {routerRedux} from 'dva/router'

export default {
    namespace: 'wechatMaterialImage',
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
            let {page, pageSize} = yield select(state => state.wechatMaterialImage);
            let {data} = yield wechatApi.wechatMaterialList({type: 'image', page, pageSize});
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
        *upload({filepath}, {put}){
            yield wechatApi.wechatMaterialImageUpload({filepath, type: 'image'});
            yield put({type: 'init'});
        }
    }
}