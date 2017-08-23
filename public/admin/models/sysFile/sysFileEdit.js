/**
 * Created by lvliqi on 2017/5/26.
 */
import SysApi from '../../service/sys'

export default {
    namespace: 'sysFileEdit',
    state: {
        visible: false,
        title: '操作文件',
        confirmLoading: false,
        item: {},
        loading: false,
    },
    reducers: {
        payload(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * set({data}, {put, select}) {
            let {content} = data;
            let {item} = yield select(state => state.sysFileEdit);
            let {path} = item;
            yield SysApi.fileWrite({content, path});
            yield put({type: 'payload', payload: {visible: false}});
            successAlert('保存成功');
        }
    }
}