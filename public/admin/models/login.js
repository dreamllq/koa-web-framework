/**
 * Created by lvliqi on 2017/5/26.
 */
import SysApi from '../service/sys'
const md5 = require('md5');
import {routerRedux} from 'dva/router'

export default {
    namespace: 'login',
    state: {
        loading: false
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *login({username, password}, {put, select}){
            yield put({type: 'payload', payload: {loading: true}});

            try {
                yield SysApi.login({username, password: md5(password)});
            } catch (e) {
                yield put({type: 'payload', payload: {loading: false}});
                throw e;
            }
            yield put({type: 'payload', payload: {loading: false}});
            const from = queryURL('from');
            // yield put({type: 'app/init'});
            if (from) {
                // yield put(routerRedux.push(from))
                location.replace(from);
            } else {
                // yield put(routerRedux.push('/admin/sys/dashboard'));
                location.replace('/admin/sys/dashboard')
            }
        }
    }
}

const queryURL = (name) => {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null
};