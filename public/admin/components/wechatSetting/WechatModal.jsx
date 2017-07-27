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
                <FormItem label="名称" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('name', {
                            initialValue: item.name || '',
                            rules: [
                                {
                                    required: true,
                                    message: '名称未填写'
                                }
                            ]
                        })(<Input/>)
                    }
                </FormItem>
                <FormItem label="appid" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('appid', {
                            initialValue: item.appid || '',
                            rules: [
                                {
                                    required: true,
                                    message: 'appid未填写'
                                }
                            ]
                        })(<Input/>)
                    }
                </FormItem>
                <FormItem label="appsecret" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('appsecret', {
                            initialValue: item.appsecret || '',
                            rules: [
                                {
                                    required: true,
                                    message: 'appsecret未填写'
                                }
                            ]
                        })(<Input/>)
                    }
                </FormItem>
            </Form>
        </Modal>
    })