import React from 'react'
import {Form, Modal, Input, Badge, Button} from 'antd'

const {TextArea} = Input;


class DeployConfigModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.item;
    }

    render() {
        let item = this.state;
        let {visible, title, onCancel, confirmLoading, onOk} = this.props;

        const modelProps = {
            visible,
            title,
            onCancel,
            width: "90%",
            confirmLoading: false,
            onOk: () => {
                let {content} = this.state;
                onOk({content});
            }
        };
        let {content} = item;

        return <Modal {...modelProps}>
            <TextArea rows={4} autosize={true} value={content} onChange={(e) => {
                let content = e.target.value;
                this.setState({content});
            }}/>
        </Modal>
    }
}

export default DeployConfigModal;