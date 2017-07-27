/**
 * Created by lvliqi on 2017/5/3.
 */
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
                <FormItem label="用户名" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('account', {
                            initialValue: item.account || '',
                            rules: [
                                {
                                    required: true,
                                    message: '用户名未填写'
                                },
                                {
                                    min: 6,
                                    max: 15,
                                    message: '用户名(6~15位)'
                                }
                            ]
                        })(<Input/>)
                    }
                </FormItem>

                <FormItem label="密码" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('password')(<Input type="password"/>)
                    }
                </FormItem>
            </Form>
        </Modal>
    })