/**
 * Created by lvliqi on 2017/4/27.
 */
import SysApi from '../service/sys'

export default {
    namespace: 'app',
    state: {
        loadEnd: false,
        siderFold: localStorage.getItem("antdAdminSiderFold") === "true" ? true : false,
        darkTheme: localStorage.getItem("antdAdminDarkTheme") === "false" ? false : true,
        login: false,
        loading: false,
        loginButtonLoading: false,
        user: {},
        menu: [],
        left: [],
        menuOpenConfig: {},
        adminName: 'Red Girl',
        adminNameSmall: 'RG'
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload}
        }
    },
    effects: {
        *init(_, {put, select}){
            let login = yield SysApi.loginCheck();
            if (login.data) {
                yield put({type: 'payload', payload: {user: login.data}});
                if (location.pathname === '/admin/login') {
                    const from = queryURL('from');
                    if (from) {
                        location.replace(from);
                    } else {
                        location.replace('/admin/sys/dashboard')
                    }
                }

                let menu_list = yield SysApi.menuList();
                yield put({
                    type: 'payload', payload: {
                        menu: menu_list.data.button,
                        menuOpenConfig: menu_list.data.config,
                        loadEnd: true,
                    }
                });
            } else {
                if (location.pathname !== '/admin/login') {
                    let from = location.pathname;
                    window.location = `${location.origin}/admin/login?from=${from}`
                }

                yield put({
                    type: 'payload', payload: {
                        loadEnd: true,
                    }
                });
            }
        },
        *changeTheme(_, {put, select}){
            let {darkTheme} = yield select(state => state.app);
            localStorage.setItem("antdAdminDarkTheme", !darkTheme);
            yield put({type: 'payload', payload: {darkTheme: !darkTheme}});
        },
        *switchSider(_, {put, select}){
            let {siderFold} = yield select(state => state.app);
            localStorage.setItem("antdAdminSiderFold", !siderFold);
            yield put({type: 'payload', payload: {siderFold: !siderFold}});
        },
        *logout(){
            yield SysApi.logout();
            window.location.replace('/admin/login');
        }
    }
}

const queryURL = (name) => {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null
};