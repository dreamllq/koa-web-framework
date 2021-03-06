/**
 * Created by lvliqi on 2017/5/3.
 */
import React from 'react'
import {Form, Modal, Input} from 'antd'
import FileChoose from '../../components/module/FileChoose'

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
             getFieldsValue,
             setFieldsValue
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
            confirmLoading,
            maskClosable: false
        };
        return <Modal {...modelProps}>
            <Form>
                <FormItem label="文件路径" {...formItemLayout}>
                    {
                        getFieldDecorator('path', {
                            initialValue: item.path || '',
                        })(<Input/>)
                    }
                </FormItem>

                <FileChoose onChange={(cf) => {
                    setFieldsValue({path: cf});
                }}/>
            </Form>
        </Modal>
    })