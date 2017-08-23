import SysApi from '../../service/sys'

export default {
    namespace: 'sysFile',
    state: {
        list: []
    },
    reducers: {
        payload(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * init(_, {put}) {
            let {data: list} = yield SysApi.fileAll();
            yield put({type: 'payload', payload: {list}});
        },
        * del({id}, {put}) {
            yield SysApi.fileDel({id});
            yield put({type: 'init'});
            successAlert('删除成功');
        },
        * readFile({path}, {put}) {
            let {data: content} = yield SysApi.fileRead({path});
            yield put({
                type: 'sysFileEdit/payload',
                payload: {
                    item: {
                        content,
                        path
                    },
                    visible: true
                }
            })
        }
    },
    subscriptions: {
        setup({history, dispatch}) {
            history.listen(location => {
                if (location.pathname == '/admin/sys/file') {
                    dispatch({type: 'init'});
                }
            });
        }
    }
}