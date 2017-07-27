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
                <FormItem label="备注" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('remark', {
                            initialValue: item.remark || '',
                            rules: [
                                {
                                    required: true,
                                    message: '备注未填写'
                                }
                            ]
                        })(<Input/>)
                    }
                </FormItem>
            </Form>
        </Modal>
    })