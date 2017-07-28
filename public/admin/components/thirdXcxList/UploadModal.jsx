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
         visible, title, onCancel, onOk, confirmLoading, item,
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
            title,
            onCancel,
            width: 800,
            onOk: handleOk,
            confirmLoading
        };
        return <Modal {...modelProps}>
            <Form>
                <FormItem label="模板id" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('template_id', {
                            initialValue: "",
                            rules: [
                                {
                                    required: true,
                                    message: '模板id未填写'
                                }
                            ]
                        })(<Input/>)
                    }
                </FormItem>
                <FormItem label="版本" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('user_version', {
                            initialValue: "",
                            rules: [
                                {
                                    required: true,
                                    message: '版本未填写'
                                }
                            ]
                        })(<Input/>)
                    }
                </FormItem>
                <FormItem label="描述" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('user_desc', {
                            initialValue: "",
                            rules: [
                                {
                                    required: true,
                                    message: '描述未填写'
                                }
                            ]
                        })(<Input/>)
                    }
                </FormItem>
            </Form>
        </Modal>
    })