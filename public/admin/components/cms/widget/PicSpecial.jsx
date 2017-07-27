import React from 'react'
import Widget from './Widget'


class PicSpecial extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {onStart, onEnd} = this.props;
        return <Widget name="图片专题" onStart={onStart} onEnd={onEnd}/>
    }

    componentDidMount() {

    }
}

export default PicSpecial;