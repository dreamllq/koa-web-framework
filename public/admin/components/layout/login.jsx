import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {
    Menu, Breadcrumb, Icon, Spin,
    message,
    Button,
    Row,
    Col,
    Form,
    Input,
    Select
} from 'antd'

const FormItem = Form.Item;

export default Form.create()(({
                                  loginButtonLoading,
                                  onOk, adminName,
                                  form: {
                                      getFieldDecorator,
                                      validateFieldsAndScroll
                                  }
                              }) => {

    function handleOk(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            onOk(values)
        })
    }


    return <div className='login_form' onSubmit={handleOk}>
        <div className='login_logo'>
            <span>{adminName}</span>
        </div>
        <form>
            <FormItem hasFeedback>
                {getFieldDecorator('username', {
                    rules: [
                        {
                            required: true,
                            message: '请填写用户名'
                        }
                    ]
                })(<Input size="large" placeholder="用户名"/>)}
            </FormItem>
            <FormItem hasFeedback>
                {getFieldDecorator('password', {
                    rules: [
                        {
                            required: true,
                            message: '请填写密码'
                        }
                    ]
                })(<Input size="large" type="password" placeholder="密码"/>)}
            </FormItem>
            <Row>
                <Button type="primary" htmlType="submit" size="large" loading={loginButtonLoading}>
                    登录
                </Button>
            </Row>
        </form>
    </div>
})