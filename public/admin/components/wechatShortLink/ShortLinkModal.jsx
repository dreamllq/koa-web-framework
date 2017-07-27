import React from 'react'
import {Form, Modal, Input} from 'antd'
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

export default Form.create()(
    ({
         visible, onCancel, onOk, confirmLoading,
         form: {
             getFieldDecorator,
             validateFields,
             getFieldsValue
         }
     }) => {
        function handleOk() {
            validateFields((errors) => {
                if (errors) {
                    return
                }
                const data = {
                    ...getFieldsValue(),
                };
                onOk(data)
            })
        }

        const modelProps = {
            visible,
            title: '生成短连接',
            onCancel,
            width: 800,
            onOk: handleOk,
            confirmLoading
        };
        return <Modal {...modelProps}>
            <Form>
                <FormItem label="长连接" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('link', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '长连接未填写'
                                }
                            ]
                        })(<Input/>)
                    }
                </FormItem>
            </Form>
        </Modal>
    })