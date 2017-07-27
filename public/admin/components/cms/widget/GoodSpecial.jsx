import React from 'react'
import Widget from './Widget'


class GoodSpecial extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {onStart, onEnd} = this.props;
        return <Widget name="商品专题" onStart={onStart} onEnd={onEnd}/>
    }

    componentDidMount() {

    }
}

export default GoodSpecial;