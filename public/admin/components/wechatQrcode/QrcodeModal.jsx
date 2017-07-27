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
         visible, onCancel, onOk, confirmLoading, qrcodeType,
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
            title: qrcodeType == 2 ? '创建临时二维码' : '创建永久二维码',
            onCancel,
            width: 800,
            onOk: handleOk,
            confirmLoading
        };
        return <Modal {...modelProps}>
            <Form>
                <FormItem label="场景ID" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('sceneId', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '场景ID未填写'
                                }
                            ]
                        })(<Input/>)
                    }
                </FormItem>
                {
                    qrcodeType == 2 ? <FormItem label="过期时间"
                                                extra="单位秒。最大不超过604800"
                                                hasFeedback {...formItemLayout}>
                        {
                            getFieldDecorator('expire', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true,
                                        message: '过期时间未填写'
                                    }
                                ]
                            })(<Input/>)
                        }
                    </FormItem> : ''
                }
            </Form>
        </Modal>
    })