/**
 * Created by lvliqi on 2017/6/2.
 */
import wechatApi from '../../service/webchat'

export default {
    namespace: 'wechatModal',
    state: {
        visible: false,
        title: '添加公众号',
        confirmLoading: false,
        item: {},
        wid: 0,
        type: 'add'
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *add({data}, {put}){
            yield put({type: 'payload', payload: {confirmLoading: true}});
            yield wechatApi.wechatAdd(data);
            yield put({
                type: 'payload', payload: {
                    visible: false,
                    confirmLoading: false
                }
            });
            yield put({type: 'wechatSetting/init'});
        },
        *edit({data}, {put, select}){
            let {item} = yield select(state => state.wechatModal);
            let {id} = item;
            yield put({type: 'payload', payload: {confirmLoading: true}});
            yield wechatApi.wechatEdit({...data, id});
            yield put({
                type: 'payload', payload: {
                    visible: false,
                    confirmLoading: false
                }
            });
            yield put({type: 'wechatSetting/init'});
        }
    }
}
