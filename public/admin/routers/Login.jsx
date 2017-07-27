import React, {Component} from 'react'
import {connect} from 'dva'
import Login from '../components/layout/login'

export default connect(({login, app}) => ({login, app}))(({dispatch, login,app}) => {
    let {loading} = login;
    return <div style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
    }} className="login-loading">
        <Login loginButtonLoading={loading} adminName={app.adminName} onOk={({username, password}) => {
            dispatch({
                type: 'login/login',
                username, password
            })
        }}/>
    </div>
});