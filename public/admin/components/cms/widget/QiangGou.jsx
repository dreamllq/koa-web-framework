import React from 'react'
import Widget from './Widget'


class QiangGou extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {onStart, onEnd} = this.props;
        return <Widget name="限时抢购区" onStart={onStart} onEnd={onEnd}/>
    }

    componentDidMount() {

    }
}

export default QiangGou;