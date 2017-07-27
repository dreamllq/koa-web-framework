/**
 * Created by lvliqi on 2017/6/7.
 */
import wechatApi from '../../service/webchat'
import {routerRedux} from 'dva/router'

export default {
    namespace: 'wechatMaterialNews',
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
    payload: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *init(_, {put}){

        }
    }
}