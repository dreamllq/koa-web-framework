import React from 'react'
import {connect} from 'dva'
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

let DoForm = Form.create()(
    ({
         form: {
             getFieldDecorator,
             validateFields,
             getFieldsValue
         }
     }) => {
        return <Form>
            <FormItem label="微信号" hasFeedback {...formItemLayout}>
                {
                    getFieldDecorator('wechatid', {
                        initialValue: "",
                        rules: [
                            {
                                required: true,
                                message: '微信号未填写'
                            }
                        ]
                    })(<Input/>)
                }
            </FormItem>
        </Form>
    })

export default connect()(
    () => {
        return <DoForm/>
    }
)