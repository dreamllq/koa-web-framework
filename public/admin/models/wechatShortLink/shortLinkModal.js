/**
 * Created by lvliqi on 2017/6/6.
 */
import wechatApi from '../../service/webchat'

export default {
    namespace: 'shortLinkModal',
    state: {
        visible: false,
        confirmLoading: false,
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *set({data}, {put, select}){
            yield put({type: 'payload', payload: {confirmLoading: true}});
            yield wechatApi.wechatShortSet(data);

            yield put({
                type: 'payload', payload: {
                    visible: false,
                    confirmLoading: false
                }
            });
            yield put({type: 'wechatShortLink/init'});
        }
    }
}