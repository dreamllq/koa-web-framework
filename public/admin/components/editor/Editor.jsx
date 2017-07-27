import React from 'react'

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.id = `editor_${Date.now()}_${Math.floor(Math.random() * 100)}`;
        this.editor = null;
        this.onChange = this.onChange.bind(this);
        this.getContent = this.getContent.bind(this);
    }

    onChange(content) {
        let {onChange} = this.props;
        if (onChange) {
            onChange(content);
        }
    }

    getContent() {
        return this.editor.getContent();
    }

    render() {
        let {id} = this;
        let {width = '100%', height = 240} = this.props;

        return <div className="editor_ui">
            <script type="text/plain" id={id} style={{
                width: width,
                height: height
            }}></script>
        </div>
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        let self = this;
        let {id} = this;
        let {value = ''} = this.props;
        this.editor = UM.getEditor(id);
        this.editor.setContent(value, false);
        this.editor.addListener("contentChange", function () {
            self.onChange(self.editor.getContent());
        });
    }
}

export default Editor;