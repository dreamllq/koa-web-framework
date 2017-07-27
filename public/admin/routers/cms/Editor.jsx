import React from 'react'
import {connect} from 'dva'
import EditorUI from '../../components/editor/Editor'

class Editor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let self = this;
        return <div>
            <EditorUI ref='editor'/>
            <div onClick={() => {
                console.log(self.refs.editor.getContent());
            }}>
                1111
            </div>
        </div>
    }

    componentDidMount() {

    }
}

export default connect(() => ({}))(Editor)