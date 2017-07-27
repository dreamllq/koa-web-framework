import React from 'react'
import {Form, Input, Button, Select} from 'antd'

export default Form.create()(
    ({
         keyword, onSearch, onAdd,
         form: {
             getFieldDecorator,
             validateFields,
             getFieldsValue,
         }
     }) => {

        let handle = () => {
            validateFields((errors) => {
                if (errors) {
                    return
                }
                const data = {
                    ...getFieldsValue(),
                };
                onSearch(data)
            })
        };


        return (
            <div className="sys_user_bar">
                <div className="user_bar_search">
                    <Form layout={'inline'}>
                        <Form.Item>
                            {getFieldDecorator('field', {
                                initialValue: 'name',
                            })(
                                <Select>
                                    <Select.Option value="name">账户</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback>
                            {getFieldDecorator('keyword', {
                                initialValue: keyword || '',
                            })(<Input/>)}
                        </Form.Item>
                        <Button type="primary" htmlType="submit" size="large" onClick={handle}>搜索</Button>
                    </Form>
                </div>
                <div className="user_bar_creat">
                    <Button type="ghost" size="large" onClick={onAdd}>添加</Button>
                </div>
            </div>
        )
    }
)
