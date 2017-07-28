/**
 * Created by lvliqi on 2017/7/22.
 */
import XcxApi from '../../service/third'

export default {
    namespace: 'interfaceModal',
    state: {
        visible: false,
        title: '设置接口地址',
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
        *show({record}, {put, select}){
            let {appid} = record;
            let interfaces = yield XcxApi.xcxModifyDomain({appid, action: 'get'});
            interfaces = interfaces.data;
            interfaces.requestdomain = interfaces.requestdomain.join(',');
            interfaces.downloaddomain = interfaces.downloaddomain.join(',');
            interfaces.uploaddomain = interfaces.uploaddomain.join(',');
            interfaces.wsrequestdomain = interfaces.wsrequestdomain.join(',');

            yield put({
                type: 'payload', payload: {
                    visible: true,
                    record,
                    item: interfaces,
                    confirmLoading: false
                }
            })
        },
        *set({data}, {put, select}){
            yield put({type: 'payload', payload: {confirmLoading: true}});
            let {record} = yield select(state => state.interfaceModal);


            data.requestdomain = data.requestdomain.split(',');
            data.downloaddomain = data.downloaddomain.split(',');
            data.uploaddomain = data.uploaddomain.split(',');
            data.wsrequestdomain = data.wsrequestdomain.split(',');

            yield XcxApi.xcxModifyDomain({
                appid: record.appid,
                ...data,
                action: 'set'
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