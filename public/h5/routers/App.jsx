import React from 'react'
import {connect} from 'dva'
import '../scss/index.scss'
import PageLoading from '../components/PageLoading'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {children, app} = this.props;
        let {loadEnd} = app;
        return loadEnd ? <div className="app">
            {children}
        </div> : <PageLoading/>;
    }

    componentDidMount() {
        let {dispatch} = this.props;
        dispatch({type: 'app/init'});
    }
}

export default connect(({app}) => ({app}))(App)