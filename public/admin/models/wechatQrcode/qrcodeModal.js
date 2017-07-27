/**
 * Created by lvliqi on 2017/6/6.
 */
import wechatApi from '../../service/webchat'

export default {
    namespace: 'qrcodeModal',
    state: {
        visible: false,
        confirmLoading: false,
        qrcodeType: 1
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *set({data}, {put, select}){
            yield put({type: 'payload', payload: {confirmLoading: true}});
            let {qrcodeType} = yield select(state => state.qrcodeModal);

            if (qrcodeType == 1) {
                //todo 永久二维码
                yield wechatApi.wechatQrcodeYJSave(data);
            } else {
                //todo 临时二维码
                yield wechatApi.wechatQrcodeLSSave(data);
            }

            yield put({
                type: 'payload', payload: {
                    visible: false,
                    confirmLoading: false
                }
            });
            yield put({type: 'wechatQrcode/init'});
        }
    }
}