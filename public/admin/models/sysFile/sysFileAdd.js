/**
 * Created by lvliqi on 2017/5/26.
 */
import SysApi from '../../service/sys'

export default {
    namespace: 'sysFileAdd',
    state: {
        visible: false,
        title: '添加地址',
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
            let {path} = data;
            if (path == "") {
                warningAlert('请选择文件');
                return;
            }
            yield SysApi.fileAdd({path});
            yield put({type: 'payload', payload: {visible: false}});
            successAlert('添加成功');
            yield put({type: 'sysFile/init'});
        }
    }
}