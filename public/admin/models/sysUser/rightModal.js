/**
 * Created by lvliqi on 2017/5/26.
 */
import SysApi from '../../service/sys'

export default {
    namespace: 'sysUserRightModal',
    state: {
        visible: false,
        title: '设置权限',
        confirmLoading: false,
        item: {},
        loading: false,
        uid: 0,
        allGroup: null,
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload}
        }
    },
    effects: {
        *getData(_, {put, select}){
            yield put({type: 'payload', payload: {loading: true}});
            let {uid, allGroup} = yield select(state => state.sysUserRightModal);
            let {data} = yield SysApi.getUserRight({uid});
            yield put({type: 'payload', payload: {item: data || {}}});

            if (!allGroup) {
                let list = yield SysApi.groupAllList();
                yield put({type: 'payload', payload: {allGroup: list.data}});
            }
            yield put({type: 'payload', payload: {loading: false}});

        },
        *submit({rgid}, {put, select}){
            yield put({type: 'payload', payload: {confirmLoading: true}});
            let {uid} = yield select(state => state.sysUserRightModal);

            yield SysApi.editUserRight({uid, rgid});
            yield put({type: 'payload', payload: {visible: false, confirmLoading: false}});
        }
    }
}