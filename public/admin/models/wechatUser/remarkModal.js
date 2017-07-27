/**
 * Created by lvliqi on 2017/6/6.
 */
import wechatApi from '../../service/webchat'

export default {
    namespace: 'remarkModal',
    state: {
        visible: false,
        title: '设置备注',
        confirmLoading: false,
        item: {},
        id: 0,
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *set({data}, {put, select}){
            yield put({type: 'payload', payload: {confirmLoading: true}});
            let {id} = yield select(state => state.remarkModal);
            let {remark} = data;
            yield wechatApi.wechatUserSetRemark({remark, id});
            yield put({
                type: 'payload', payload: {
                    visible: false,
                    confirmLoading: false
                }
            });
            yield put({type: 'wechatUser/init'});
        }
    }
}