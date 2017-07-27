/**
 * Created by lvliqi on 2017/6/6.
 */
import wechatApi from '../../service/webchat'

export default {
    namespace: 'wechatUGroup',
    state: {
        loadEnd: false,
        list: [],
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *init(_, {put}){
            let {data} = yield wechatApi.wechatUGroupList();
            yield put({type: 'payload', payload: {list: data}});
        },
        *asyncGroup(_, {put}){
            yield wechatApi.wechatUGroupAsync();
            yield put({type: 'init'});
            successAlert('同步完成');
        },
        *deleteGroup({id}, {put}){
            yield wechatApi.wechatUGroupRemove({id});
            yield put({type: 'init'});
            successAlert('删除成功');
        }
    },
    subscriptions: {
        setup({history, dispatch}){
            history.listen(location => {
                if (location.pathname == '/admin/wechat/ugroup') {
                    dispatch({type: 'init'});
                }
            });
        }
    }
}