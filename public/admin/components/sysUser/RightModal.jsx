import React from 'react'
import {Form, Modal, Select, Icon} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;
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
         visible, title, onCancel, onOk, confirmLoading, item, loading, allGroup,
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
            {
                !loading ? (
                    <Form>
                        <FormItem label="权限" hasFeedback {...formItemLayout}>
                            {
                                getFieldDecorator('rgid', {
                                    initialValue: (item.rgid && item.rgid.toString()) || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '未选择权限'
                                        }
                                    ]
                                })(<Select
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) => {
                                        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }}
                                >
                                    {
                                        allGroup.map(d => <Option value={d.id.toString()} key={d.id}>{d.name}</Option>)
                                    }
                                </Select>)
                            }
                        </FormItem>
                    </Form>
                ) : <Icon type="loading"/>
            }

        </Modal>
    })