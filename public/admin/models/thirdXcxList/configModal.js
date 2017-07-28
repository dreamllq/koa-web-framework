/**
 * Created by lvliqi on 2017/7/22.
 */
import XcxApi from '../../service/third'

export default {
    namespace: 'configModal',
    state: {
        visible: false,
        title: '设置ext',
        confirmLoading: false,
        item: {},
        id: 0,
        record: {},
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *set({data}, {put, select}){
            yield put({type: 'payload', payload: {confirmLoading: true}});
            let {record} = yield select(state => state.configModal);
            // let {remark} = data;
            // yield wechatApi.wechatUserSetRemark({remark, id});
            yield XcxApi.xcxUpdateConfig({
                appid: record.appid,
                ...data
            });
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