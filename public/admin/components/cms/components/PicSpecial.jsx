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

class PicSpecialModal extends React.Component {
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
        let {list = [], name, sec_name} = this.state;

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
            title: '设置 图片专题 数据',
            onCancel,
            width: 800,
            onOk: handleOk,
            confirmLoading,
            maskClosable: false
        };
        return <Modal {...modelProps}>
            <Form >
                <FormItem label="一级标题" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('name', {
                            initialValue: name || '',
                            rules: [
                                {
                                    required: true,
                                    message: '一级标题未填写'
                                }
                            ]
                        })(<Input size='default' onChange={(e) => {
                            self.setState({name: e.target.value});
                        }}/>)
                    }
                </FormItem>
                <FormItem label="二级标题" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('sec_name', {
                            initialValue: sec_name || '',
                            rules: [
                                {
                                    required: true,
                                    message: '二级标题未填写'
                                }
                            ]
                        })(<Input size='default' onChange={(e) => {
                            self.setState({sec_name: e.target.value});
                        }}/>)
                    }

                </FormItem>
            </Form>
            {
                list.map((d, i) => <div key={i}>
                    <Card title={`图片 ${i + 1}`}
                          extra={<span>
                              <a onClick={() => {
                                  list.splice(i, 1);
                                  self.setState({list});
                              }}>删除</a>
                              <span className="ant-divider"/>
                              <a onClick={() => {
                                  if (i == 0) return;
                                  let a = list[i];
                                  list[i] = list[i - 1];
                                  list[i - 1] = a;
                                  self.setState({list: []}, function () {
                                      self.setState({list})
                                  });
                              }}>上移</a>
                              <span className="ant-divider"/>
                              <a onClick={() => {
                                  if (i == list.length - 1) return;
                                  let a = list[i];
                                  list[i] = list[i + 1];
                                  list[i + 1] = a;
                                  self.setState({list: []}, function () {
                                      self.setState({list})
                                  });
                              }}>下移</a>
                          </span>}
                          style={{
                              marginTop: 16,
                              marginBottom: 16
                          }}
                    >
                        <Row>
                            <Col span={4}>
                                <div className="img" style={{
                                    width: 120,
                                    height: 120,
                                    backgroundImage: `url(${d.image})`,
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: 4
                                }}></div>
                            </Col>
                            <Col span={20}>
                                <Form >
                                    <FormItem label="图片" hasFeedback {...formItemLayout}>
                                        {
                                            getFieldDecorator(`image_${i}`, {
                                                initialValue: d.image || '',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '图片未上传'
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
                                                                       list[i].image = d.url;
                                                                       self.setState({list});
                                                                       let fv = {};
                                                                       fv[`image_${i}`] = d.url;
                                                                       setFieldsValue(fv);
                                                                   });
                                                               }
                                                           }
                                                       }}
                                            >
                                                <Button size='default'><Icon type="upload"/> 上传图片</Button>
                                            </Upload>)
                                        }

                                    </FormItem>
                                    <FormItem label="跳转链接 app" hasFeedback {...formItemLayout}>
                                        {
                                            getFieldDecorator(`link_${i}`, {
                                                initialValue: d.link || '',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '跳转链接未填写'
                                                    }
                                                ]
                                            })(<Input size='default' onChange={(e) => {
                                                list[i].link = e.target.value;
                                                self.setState({list});
                                            }}/>)
                                        }
                                    </FormItem>
                                    <FormItem label="跳转链接 web" hasFeedback {...formItemLayout}>
                                        {
                                            getFieldDecorator(`wx_link_${i}`, {
                                                initialValue: d.wx_link || '',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '跳转链接未填写'
                                                    }
                                                ]
                                            })(<Input size='default' onChange={(e) => {
                                                list[i].wx_link = e.target.value;
                                                self.setState({list});
                                            }}/>)
                                        }
                                    </FormItem>
                                </Form>
                            </Col>
                        </Row>

                    </Card>
                </div>)
            }
            {
                list.length < 16 ? <Button type="dashed" style={{width: '60%', margin: '0 auto', display: 'block'}}
                                           onClick={() => {
                                               list.push({
                                                   image: '',
                                                   link: '',
                                                   wx_link: ''
                                               });
                                               self.setState({
                                                   list
                                               })
                                           }}
                >
                    <Icon type="plus"/> 添加图片
                </Button> : ''
            }

        </Modal>
    }
}

const PicSpecialForm = Form.create()(PicSpecialModal);

class PicSpecial extends React.Component {
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
            <CmsBaseComponent {...this.props} name="图片专题" onEdit={() => {
                self.setState({
                    visible: true
                });
            }}/>
            {visible ? <PicSpecialForm {...FormProps}/> : ''}
        </div>
    }
}

export default PicSpecial;