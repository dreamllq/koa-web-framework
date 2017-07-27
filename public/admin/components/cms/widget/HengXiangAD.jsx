import React from 'react'
import Widget from './Widget'


class HengXiangAD extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {onStart, onEnd} = this.props;
        return <Widget name="横向滚动广告位" onStart={onStart} onEnd={onEnd}/>
    }

    componentDidMount() {

    }
}

export default HengXiangAD;