import React from 'react'
import Widget from './Widget'


class IconC extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {onStart, onEnd} = this.props;
        return <Widget name="ICON位" onStart={onStart} onEnd={onEnd}/>
    }

    componentDidMount() {

    }
}

export default IconC;