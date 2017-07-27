import wechatApi from '../../service/webchat'
import {routerRedux} from 'dva/router'

export default {
    namespace: 'wechatMaterial',
    state: {
        selectedKeys: 'news'
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *init(_, {put, select}){
            let {selectedKeys} = yield select(state => state.wechatMaterial);
            switch (selectedKeys) {
                case 'news':
                    yield put({type: 'wechatMaterialNews/init'});
                    break;
                case 'image':
                    yield put({type: 'wechatMaterialImage/init'});
                    break;
                case 'voice':
                    yield put({type: 'wechatMaterialVoice/init'});
                    break;
                case 'video':
                    yield put({type: 'wechatMaterialVideo/init'});
                    break;
                default:
                    yield put({type: 'wechatMaterialNews/init'});
                    break;
            }
        },
        *changeMenu({key, location}, {put}){
            location.query.key = key;
            yield put(routerRedux.push({
                pathname: location.pathname,
                query: location.query
            }));
        }
    },
    subscriptions: {
        setup({history, dispatch}){
            history.listen(location => {
                if (location.pathname == '/admin/wechat/material') {
                    let {key = 'news'} = location.query;
                    dispatch({type: 'payload', payload: {selectedKeys: key}});
                    dispatch({type: 'init'});
                }
            });
        }
    }
}