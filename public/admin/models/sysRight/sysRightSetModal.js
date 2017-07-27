/**
 * Created by lvliqi on 2017/5/25.
 */
import SysApi from '../../service/sys'

export default {
    namespace: 'sysRightSetModal',
    state: {
        visible: false,
        title: '设置权限',
        confirmLoading: false,
        item: [],
        loading: false,
        rgid: 0,
        allRight: null,
        keys: []
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *getRights(_, {put, select}){
            let {rgid, allRight} = yield select(state => state.sysRightSetModal);
            yield put({type: 'payload', payload: {loading: true}});
            let {data} = yield SysApi.groupDetailInfo({rgid});
            let keys = data.map(d => {
                return `${d.type}_${d.rbid}`
            });
            yield put({type: 'payload', payload: {keys: keys}});
            if (!allRight) {
                let all = yield SysApi.allRightList();
                yield put({type: 'payload', payload: {allRight: all.data}});
            }
            yield put({type: 'payload', payload: {loading: false}});
        },
        *subRight(_, {put, select}){
            yield put({type: 'payload', payload: {confirmLoading: true}});
            let {keys, rgid} = yield select(state => state.sysRightSetModal);
            let list = keys.map(d => {
                let [type, id] = d.split('_');
                return {type, id};
            });

            // console.log(list);
            yield SysApi.addGroupDetail({rgid, list: JSON.stringify(list)});
            yield put({type: 'payload', payload: {confirmLoading: false, visible: false}});
            successAlert('权限修改成功');
        }
    }
}