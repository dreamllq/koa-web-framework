/**
 * Created by lvliqi on 2017/6/14.
 */
import FuncApi from '../services/func'

export default {
    namespace: 'app',
    state: {
        loadEnd: false
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *init(_, {put}){
            let jsapi_config = yield FuncApi.jsapi({
                url: window.location.href.split('#')[0]
            });
            yield put({type: 'payload', payload: {loadEnd: true}});
            wx.config(jsapi_config.data);
        }
    }
}