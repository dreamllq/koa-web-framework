/**
 * Created by lvliqi on 2017/7/22.
 */
import XcxApi from '../../service/third'

export default {
    namespace: 'uploadModal',
    state: {
        visible: false,
        title: '设置上传信息',
        confirmLoading: false,
        item: {},
        id: 0,
        record: {}
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *set({data}, {put, select}){
            yield put({type: 'payload', payload: {confirmLoading: true}});
            let {record} = yield select(state => state.uploadModal);

            yield XcxApi.xcxUpload({
                appid: record.appid,
                ...data
            });

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