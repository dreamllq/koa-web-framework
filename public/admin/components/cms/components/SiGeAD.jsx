import React from 'react'
import CmsBaseComponent from './CmsBaseComponent'
import {Modal, Input, Upload, Button, Icon, Form, Card, Row, Col} from 'antd'
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

class SiGeADModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(JSON.stringify(this.props.item));
    }

    render() {
        let self = this;
        let {
            visible, onCancel, onOk, confirmLoading, form: {
                getFieldDecorator,
                validateFields,
                setFieldsValue
            }
        } = this.props;
        let {
            s1 = {image: '', link: '', wx_link: ''},
            s2 = {image: '', link: '', wx_link: ''},
            s3 = {image: '', link: '', wx_link: ''},
            s4 = {image: '', link: '', wx_link: ''}
        } = this.state;

        function handleOk() {
            validateFields((errors) => {
                if (errors) {
                    return
                }
                onOk(self.state);
            })
        }

        const modelProps = {
            visible,
            title: '设置 四格广告位 数据',
            onCancel,
            width: 800,
            onOk: handleOk,
            confirmLoading,
            maskClosable: false
        };
        return <Modal {...modelProps}>
            <Card title='左区'
                  style={{
                      marginTop: 16,
                      marginBottom: 16
                  }}>
                <Row>
                    <Col span={6}>
                        <div className="img" style={{
                            width: 120,
                            height: 120,
                            backgroundImage: `url(${s1.image})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            border: '1px solid #d9d9d9',
                            borderRadius: 4
                        }}></div>
                    </Col>
                    <Col span={18}>
                        <Form >
                            <FormItem label="图片" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s1_image', {
                                        initialValue: s1.image || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '图标未上传'
                                            }
                                        ]
                                    })(<Upload multiple={false}
                                               showUploadList={false}
                                               action='/func/upload/local'
                                               onChange={({file}) => {
                                                   if (file.status == 'done') {
                                                       let {response} = file;
                                                       if (response.errno == 0) {
                                                           response.data.forEach(d => {
                                                               s1.image = d.url;
                                                               self.setState({s1});
                                                               setFieldsValue({
                                                                   's1_image': d.url
                                                               })
                                                           });
                                                       }
                                                   }
                                               }}
                                    >
                                        <Button size="default"><Icon type="upload"/> 上传图片</Button>
                                    </Upload>)
                                }
                            </FormItem>
                            <FormItem label="跳转链接 app" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s1_link', {
                                        initialValue: s1.link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s1.link = e.target.value;
                                        self.setState({s1});
                                    }}/>)
                                }
                            </FormItem>
                            <FormItem label="跳转链接 web" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s1_wx_link', {
                                        initialValue: s1.wx_link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s1.wx_link = e.target.value;
                                        self.setState({s1});
                                    }}/>)
                                }
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Card>

            <Card title='右上区'
                  style={{
                      marginTop: 16,
                      marginBottom: 16
                  }}>
                <Row>
                    <Col span={6}>
                        <div className="img" style={{
                            width: 120,
                            height: 120,
                            backgroundImage: `url(${s2.image})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            border: '1px solid #d9d9d9',
                            borderRadius: 4
                        }}></div>
                    </Col>
                    <Col span={18}>
                        <Form >
                            <FormItem label="图片" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s2_image', {
                                        initialValue: s2.image || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '图标未上传'
                                            }
                                        ]
                                    })(<Upload multiple={false}
                                               showUploadList={false}
                                               action='/func/upload/local'
                                               onChange={({file}) => {
                                                   if (file.status == 'done') {
                                                       let {response} = file;
                                                       if (response.errno == 0) {
                                                           response.data.forEach(d => {
                                                               s2.image = d.url;
                                                               self.setState({s2});
                                                               setFieldsValue({
                                                                   's2_image': d.url
                                                               })
                                                           });
                                                       }
                                                   }
                                               }}
                                    >
                                        <Button size="default"><Icon type="upload"/> 上传图片</Button>
                                    </Upload>)
                                }
                            </FormItem>
                            <FormItem label="跳转链接 app" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s2_link', {
                                        initialValue: s2.link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s2.link = e.target.value;
                                        self.setState({s2});
                                    }}/>)
                                }
                            </FormItem>
                            <FormItem label="跳转链接 web" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s2_wx_link', {
                                        initialValue: s2.wx_link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s2.wx_link = e.target.value;
                                        self.setState({s2});
                                    }}/>)
                                }
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Card>

            <Card title='右下左区'
                  style={{
                      marginTop: 16,
                      marginBottom: 16
                  }}>
                <Row>
                    <Col span={6}>
                        <div className="img" style={{
                            width: 120,
                            height: 120,
                            backgroundImage: `url(${s3.image})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            border: '1px solid #d9d9d9',
                            borderRadius: 4
                        }}></div>
                    </Col>
                    <Col span={18}>
                        <Form >
                            <FormItem label="图片" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s3_image', {
                                        initialValue: s3.image || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '图标未上传'
                                            }
                                        ]
                                    })(<Upload multiple={false}
                                               showUploadList={false}
                                               action='/func/upload/local'
                                               onChange={({file}) => {
                                                   if (file.status == 'done') {
                                                       let {response} = file;
                                                       if (response.errno == 0) {
                                                           response.data.forEach(d => {
                                                               s3.image = d.url;
                                                               self.setState({s3});
                                                               setFieldsValue({
                                                                   's3_image': d.url
                                                               })
                                                           });
                                                       }
                                                   }
                                               }}
                                    >
                                        <Button size="default"><Icon type="upload"/> 上传图片</Button>
                                    </Upload>)
                                }
                            </FormItem>
                            <FormItem label="跳转链接 app" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s3_link', {
                                        initialValue: s3.link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s3.link = e.target.value;
                                        self.setState({s3});
                                    }}/>)
                                }
                            </FormItem>
                            <FormItem label="跳转链接 web" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s3_wx_link', {
                                        initialValue: s3.wx_link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s3.wx_link = e.target.value;
                                        self.setState({s3});
                                    }}/>)
                                }
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Card>

            <Card title='右下右区'
                  style={{
                      marginTop: 16,
                      marginBottom: 16
                  }}>
                <Row>
                    <Col span={6}>
                        <div className="img" style={{
                            width: 120,
                            height: 120,
                            backgroundImage: `url(${s4.image})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            border: '1px solid #d9d9d9',
                            borderRadius: 4
                        }}></div>
                    </Col>
                    <Col span={18}>
                        <Form >
                            <FormItem label="图片" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s4_image', {
                                        initialValue: s4.image || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '图标未上传'
                                            }
                                        ]
                                    })(<Upload multiple={false}
                                               showUploadList={false}
                                               action='/func/upload/local'
                                               onChange={({file}) => {
                                                   if (file.status == 'done') {
                                                       let {response} = file;
                                                       if (response.errno == 0) {
                                                           response.data.forEach(d => {
                                                               s4.image = d.url;
                                                               self.setState({s4});
                                                               setFieldsValue({
                                                                   's4_image': d.url
                                                               })
                                                           });
                                                       }
                                                   }
                                               }}
                                    >
                                        <Button size="default"><Icon type="upload"/> 上传图片</Button>
                                    </Upload>)
                                }
                            </FormItem>
                            <FormItem label="跳转链接 app" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s4_link', {
                                        initialValue: s4.link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s4.link = e.target.value;
                                        self.setState({s4});
                                    }}/>)
                                }
                            </FormItem>
                            <FormItem label="跳转链接 web" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s4_wx_link', {
                                        initialValue: s4.wx_link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s4.wx_link = e.target.value;
                                        self.setState({s4});
                                    }}/>)
                                }
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Modal>
    }
}

const SiGeADForm = Form.create()(SiGeADModal);

class SiGeAD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    render() {
        let self = this;
        let {visible} = this.state;
        let {onSetData, data = {}} = this.props;
        let FormProps = {
            visible,
            onCancel(){
                self.setState({
                    visible: false
                });
            },
            onOk(data){
                onSetData(data);
                self.setState({
                    visible: false
                });
            },
            item: {...data}
        };

        return <div>
            <CmsBaseComponent {...this.props} name="四格广告位" onEdit={() => {
                self.setState({
                    visible: true
                });
            }}/>
            {visible ? <SiGeADForm {...FormProps}/> : ''}
        </div>
    }
}

export default SiGeAD;