import React from 'react'
import Widget from './Widget'


class NewsSpecial extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {onStart, onEnd} = this.props;
        return <Widget name="图文专题" onStart={onStart} onEnd={onEnd}/>
    }

    componentDidMount() {

    }
}

export default NewsSpecial;