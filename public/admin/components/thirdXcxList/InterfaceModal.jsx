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
                <FormItem label="request合法域名" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('requestdomain', {
                            initialValue: item.requestdomain || '',
                            rules: [
                                {
                                    required: true,
                                    message: 'request合法域名未填写'
                                }
                            ]
                        })(<Input/>)
                    }
                </FormItem>
                <FormItem label="socket合法域名" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('wsrequestdomain', {
                            initialValue: item.wsrequestdomain || '',
                            rules: [
                                {
                                    required: true,
                                    message: 'socket合法域名未填写'
                                }
                            ]
                        })(<Input/>)
                    }
                </FormItem>
                <FormItem label="uploadFile合法域名" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('uploaddomain', {
                            initialValue: item.uploaddomain || '',
                            rules: [
                                {
                                    required: true,
                                    message: 'uploadFile合法域名未填写'
                                }
                            ]
                        })(<Input/>)
                    }
                </FormItem>
                <FormItem label="downloadFile合法域名" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('downloaddomain', {
                            initialValue: item.downloaddomain || '',
                            rules: [
                                {
                                    required: true,
                                    message: 'downloadFile合法域名未填写'
                                }
                            ]
                        })(<Input/>)
                    }
                </FormItem>
            </Form>
        </Modal>
    })