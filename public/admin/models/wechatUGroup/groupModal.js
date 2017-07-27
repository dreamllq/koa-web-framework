/**
 * Created by lvliqi on 2017/6/7.
 */
import wechatApi from '../../service/webchat'

export default {
    namespace: 'wechatUGroupModal',
    state: {
        visible: false,
        title: '创建分组',
        confirmLoading: false,
        item: {},
        id: 0,
        type: 'add'
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *add({data}, {put, select}){
            yield put({type: 'payload', payload: {confirmLoading: true}});
            let {name} = data;
            yield wechatApi.wechatUGroupAdd({name});
            yield put({
                type: 'payload', payload: {
                    visible: false,
                    confirmLoading: false
                }
            });
            yield put({type: 'wechatUGroup/init'});
            successAlert('创建成功');
        },
        *update({data}, {put, select}){
            yield put({type: 'payload', payload: {confirmLoading: true}});
            let {id} = yield select(state => state.wechatUGroupModal);
            let {name} = data;
            yield wechatApi.wechatUGroupUpdate({id, name});
            yield put({
                type: 'payload', payload: {
                    visible: false,
                    confirmLoading: false
                }
            });
            yield put({type: 'wechatUGroup/init'});
            successAlert('修改成功');
        }
    }
}