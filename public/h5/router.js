/**
 * Created by lvliqi on 2017/6/14.
 */
import React from 'react';
import {Router, Route, IndexRoute, IndexRedirect} from 'dva/router';

const cached = {};
function registerModel(app, model) {
    if (!cached[model.namespace]) {
        app.model(model);
        cached[model.namespace] = 1;
    }
}


export default ({history, app}) => {
    return (
        <Router history={history}>
            <Route path="/h5" getComponent={(nextState, cb) => {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/app'));
                    cb(null, require('./routers/App'))
                }, 'App')
            }}>
            </Route>
        </Router>
    )
}