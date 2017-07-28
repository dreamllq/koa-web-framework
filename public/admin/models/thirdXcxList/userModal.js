/**
 * Created by lvliqi on 2017/7/22.
 */
import XcxApi from '../../service/third'

export default {
    namespace: 'userModal',
    state: {
        visible: false,
        title: '设置体验者',
        confirmLoading: false,
        item: {},
        id: 0,
        record: {},
        bind: true
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *bind({record}, {put, select}){
            yield put({
                type: 'payload', payload: {
                    visible: true,
                    record,
                    title: '添加体验者',
                    bind: true,
                    confirmLoading: false
                }
            })
        },
        *unbind({record}, {put, select}){
            yield put({
                type: 'payload', payload: {
                    visible: true,
                    record,
                    title: '移除体验者',
                    bind: false,
                    confirmLoading: false
                }
            })
        },
        *set({data}, {put, select}){
            yield put({type: 'payload', payload: {confirmLoading: true}});
            let {record, bind} = yield select(state => state.userModal);
            if (bind) {
                yield XcxApi.xcxBindTester({
                    appid: record.appid,
                    ...data
                });
            } else {
                yield XcxApi.xcxUnbindTester({
                    appid: record.appid,
                    ...data
                });
            }

            // let {remark} = data;
            // yield wechatApi.wechatUserSetRemark({remark, id});
            yield put({
                type: 'payload', payload: {
                    visible: false,
                    confirmLoading: false
                }
            });
            successAlert("操作成功");

            yield put({type: 'thirdXcxList/init'});
        }
    }
}