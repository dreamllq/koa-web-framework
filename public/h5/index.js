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
import './util'

const app = dva({
    history: browserHistory,
    onError: (e) => {
        alert(e.message);
    }
});

app.router(require('./router'));
app.start('#root');


