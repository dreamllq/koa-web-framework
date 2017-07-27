import React, {Component} from 'react'
import {connect} from 'dva'
import Sider from '../components/layout/sider'
import Header from '../components/layout/header'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import cs from 'classnames'
import '../scss/layout.scss'
import NProgress from 'nprogress'
let lastHref;

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {app, dispatch, children, location, g_loading} = this.props;
        let {darkTheme, siderFold, login, loading, loginButtonLoading, user, menu, loadEnd, menuOpenConfig, adminName, adminNameSmall} = app;
        const href = window.location.href;

        if (lastHref !== href) {
            NProgress.start();
            if (!g_loading.global) {
                NProgress.done();
                lastHref = href
            }
        }

        const headerProps = {
            siderFold,
            user,
            switchSider() {
                dispatch({type: 'app/switchSider'})
            },
            onLogout: () => {
                dispatch({type: 'app/logout'});
            },
            menu,
            menuOpenConfig,
            location
        };
        const siderProps = {
            darkTheme,
            siderFold,
            changeTheme(){
                dispatch({type: 'app/changeTheme'})
            },
            menu,
            menuOpenConfig,
            location,
            adminName,
            adminNameSmall
        };

        const BreadProps = {
            menu, menuOpenConfig
        };

        if (!loadEnd) return <div></div>;

        if (location.pathname === '/admin/login') {
            return children;
        }

        return <div className={cs({
            "ant-layout-aside": true,
            'fold': siderFold
        })}>
            <aside className={cs({
                "ant-layout-sider": true,
                'light': !darkTheme
            })}>
                <Sider {...siderProps}/>
            </aside>
            <div className="ant-layout-main">
                <Header {...headerProps}/>
                <Bread {...BreadProps}/>
                <div className="ant-layout-container">
                    <div className="ant-layout-content">
                        <div className="content-inner">
                            {children}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    }

    componentDidMount() {
        let {dispatch} = this.props;
        dispatch({type: 'app/init'});
    }
}

export default connect(({app, g_loading}) => ({app, g_loading}))(App);