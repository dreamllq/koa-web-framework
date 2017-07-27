/**
 * Created by lvliqi on 2017/6/7.
 */
import wechatApi from '../../service/webchat'
import {routerRedux} from 'dva/router'

export default {
    namespace: 'wechatMaterialVoice',
    state: {},
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