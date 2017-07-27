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

class DanTiaoADModal extends React.Component {
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
        let {image = '', link = '', wx_link = ''} = this.state;

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
            title: '设置 单条广告位 数据',
            onCancel,
            width: 800,
            onOk: handleOk,
            confirmLoading,
            maskClosable: false
        };
        return <Modal {...modelProps}>
            <Form >
                <FormItem label="图片" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('image', {
                            initialValue: image || '',
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
                                           console.log(file);
                                           let {response} = file;
                                           if (response.errno == 0) {
                                               response.data.forEach(d => {
                                                   self.setState({image: d.url});
                                                   setFieldsValue({image: d.url});
                                               });
                                           }
                                       }
                                   }}
                        >
                            <Button size="large"><Icon type="upload"/> 上传图片</Button>
                        </Upload>)
                    }
                </FormItem>
                <FormItem label="跳转链接 app" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('link', {
                            initialValue: link || '',
                            rules: [
                                {
                                    required: true,
                                    message: '跳转链接未设置'
                                }
                            ]
                        })(<Input onChange={(e) => {
                            self.setState({link: e.target.value});
                        }}/>)
                    }
                </FormItem>
                <FormItem label="跳转链接 web" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('wx_link', {
                            initialValue: wx_link || '',
                            rules: [
                                {
                                    required: true,
                                    message: '跳转链接未设置'
                                }
                            ]
                        })(<Input onChange={(e) => {
                            self.setState({wx_link: e.target.value});
                        }}/>)
                    }
                </FormItem>
                <FormItem label="图片" {...formItemLayout}>
                    <div className="img" style={{
                        width: 350,
                        height: 80,
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        border: '1px solid #d9d9d9',
                        borderRadius: 4
                    }}></div>
                </FormItem>

            </Form>
        </Modal>
    }
}

const DanTiaoADForm = Form.create()(DanTiaoADModal);

class DanTiaoAD extends React.Component {
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
            <CmsBaseComponent {...this.props} name="单条广告位" onEdit={() => {
                self.setState({
                    visible: true
                });
            }}/>
            {visible ? <DanTiaoADForm {...FormProps}/> : ''}
        </div>
    }
}

export default DanTiaoAD;