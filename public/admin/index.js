/**
 * Created by lvliqi on 2017/4/27.
 */
import 'es5-shim'
import 'es5-shim/es5-sham'
import 'babel-regenerator-runtime'
import 'babel-polyfill'
import 'es6-promise/auto'


import dva from 'dva';
import {browserHistory} from 'dva/router';
import {message, Modal} from 'antd';
import createLoading from 'dva-loading';
import './scss/index.scss'

const app = dva({
    ...createLoading({
        effects: true,
        namespace: 'g_loading'
    }),
    history: browserHistory,
    onError(e) {
        console.error(e.message);
        errorAlert(e.message);
    },
});

window.warningAlert = (msg) => {
    message.warning(msg, 2);
};

window.successAlert = (msg) => {
    message.success(msg, 2);
};

window.errorAlert = (msg) => {
    message.error(msg, 2);
};

window.confirm = ({
                      title = '系统提示',
                      content,
                      onCancel = () => {
                      },
                      onOk = () => {
                      }
                  }) => {
    Modal.confirm({
        title: title,
        content: content,
        okText: '确认',
        cancelText: '取消',
        onOk: onOk,
        onCancel: onCancel
    });
};

// model(app);
// router(app);
app.router(require('./router'));
app.start('#root');

