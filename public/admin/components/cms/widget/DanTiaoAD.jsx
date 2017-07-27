import React from 'react'
import Widget from './Widget'


class DanTiaoAD extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {onStart, onEnd} = this.props;
        return <Widget name="单条广告位" onStart={onStart} onEnd={onEnd}/>
    }

    componentDidMount() {

    }
}

export default DanTiaoAD;