import React from 'react'
import Widget from './Widget'


class PinPaiQiang extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {onStart, onEnd} = this.props;
        return <Widget name="品牌墙" onStart={onStart} onEnd={onEnd}/>
    }

    componentDidMount() {

    }
}

export default PinPaiQiang;