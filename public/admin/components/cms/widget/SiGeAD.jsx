import React from 'react'
import Widget from './Widget'


class SiGeAD extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {onStart, onEnd} = this.props;
        return <Widget name="四格广告位" onStart={onStart} onEnd={onEnd}/>
    }

    componentDidMount() {

    }
}

export default SiGeAD;