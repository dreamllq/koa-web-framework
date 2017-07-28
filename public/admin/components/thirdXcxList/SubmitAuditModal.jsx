import React from 'react'
import {Form, Modal, Input, Select, Button, Icon, Row, Col} from 'antd'
const FormItem = Form.Item;
const SelectOption = Select.Option;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};


class SubmitAuditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card: [1]
        }
    }

    render() {
        let self = this;
        let {
            visible, title, onCancel, onOk, confirmLoading, item,
            form: {
                getFieldDecorator,
                validateFields,
                getFieldsValue,
                setFieldsValue
            }
        } = this.props;

        let {card} = this.state;

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

        let {category, page} = item;

        let ca = category.map((d, i) => {
            return {
                value: i.toString(),
                label: `${d.first_class || ''} ${d.second_class || ''} ${d.third_class || ''}`
            }
        });

        let p = page.map((d, i) => {
            return {
                value: i.toString(),
                label: d
            }
        });

        return <Modal {...modelProps}>
            <div>
                {
                    card.map((d, i) => <Row type="flex" justify="start" key={i}>
                            <Col span={22}>
                                <Form>
                                    <FormItem label="功能页面" {...formItemLayout}>
                                        {
                                            getFieldDecorator(`item_list[${i}].p`, {
                                                initialValue: '0',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '功能页面未选择'
                                                    }
                                                ]
                                            })(<Select>
                                                {
                                                    p.map((d, i) => <SelectOption key={i} value={d.value}>{d.label}</SelectOption>)
                                                }
                                            </Select>)
                                        }
                                    </FormItem>
                                    <FormItem label="小程序页面的标题" extra="标题长度不超过32" hasFeedback {...formItemLayout}>
                                        {
                                            getFieldDecorator(`item_list[${i}].title`, {
                                                initialValue: "",
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '标题未填写'
                                                    }, {
                                                        max: 32,
                                                        message: '标题长度不超过32'
                                                    }]
                                            })(<Input/>)
                                        }
                                    </FormItem>
                                    <FormItem label="可选分类" {...formItemLayout}>
                                        {
                                            getFieldDecorator(`item_list[${i}].ca`, {
                                                initialValue: '0',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '可选分类未选择'
                                                    }
                                                ]
                                            })(<Select>
                                                {
                                                    ca.map((d, i) => <SelectOption key={i} value={d.value}>{d.label}</SelectOption>)
                                                }
                                            </Select>)
                                        }
                                    </FormItem>
                                    <FormItem label="小程序标签" extra="多个标签,（半角/英文逗号）分隔，标签最多20个" hasFeedback {...formItemLayout}>
                                        {
                                            getFieldDecorator(`item_list[${i}].tag`, {
                                                initialValue: "",
                                            })(<Input/>)
                                        }
                                    </FormItem>
                                </Form>
                            </Col>
                            <Col span={2}>
                                {
                                    i > 0 ? <Button type="primary" size='small' onClick={() => {
                                        card.splice(i, 1);
                                        let data = getFieldsValue();
                                        data.item_list.splice(i, 1);
                                        setFieldsValue({
                                            item_list: data.item_list
                                        });
                                        self.setState({card});
                                    }}>删除</Button> : ''
                                }
                            </Col>
                        </Row>
                    )
                }

                {
                    card.length < 5 ? <Button type="dashed" style={{width: '60%', margin: '0 auto', display: 'block'}}
                                              onClick={() => {
                                                  card.push(1);
                                                  self.setState({card});
                                              }}
                    >
                        <Icon type="plus"/> 添加
                    </Button> : ''
                }
            </div>
        </Modal>
    }
}


export default Form.create()(SubmitAuditForm)