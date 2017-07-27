import React from 'react'
import {connect} from 'dva'
import {Table, Icon, Badge, Row, Col, Button, Select, Upload} from 'antd'
import QrcodeModal from '../../components/wechatQrcode/QrcodeModal'
import moment from 'moment'

export default connect(({wechatQrcode, qrcodeModal}) => ({wechatQrcode, qrcodeModal}))(
    ({dispatch, wechatQrcode, qrcodeModal}) => {
        let {page, pageSize, list, loading, total} = wechatQrcode;
        let columns = [
            {
                title: '状态',
                key: 'status',
                render: (text, record) => {
                    if (record.type == 1) {
                        return <span><Badge status="processing"/> 使用中</span>
                    } else {
                        if (moment().unix() > record.create_time + record.expire_seconds) {
                            return <span><Badge status="error"/> 已过期</span>
                        } else {
                            return <span><Badge status="processing"/> 使用中</span>
                        }
                    }
                }
            },
            {
                title: '类型',
                key: 'type',
                render: (text, record) => <span>{record.type == 1 ? '永久' : '临时'}</span>
            },
            {
                title: '二维码',
                key: 'url',
                width: 80,
                render: (text, record) => <a href={record.url} target="_blank"><img src={record.url} width={40} height={40}/></a>
            },
            {
                title: '场景ID',
                key: 'sceneId',
                dataIndex: 'sceneId'
            },
            {
                title: '创建时间',
                key: 'create_time',
                render: (text, record) => <span>{moment.unix(record.create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
            },
            {
                title: '过期时间',
                key: 'expire_time',
                render: (text, record) => <span>{record.type == 1 ? '无过期时间' : moment.unix(record.create_time + record.expire_seconds).format('YYYY-MM-DD HH:mm:ss')}</span>
            },
            {
                title: '操作',
                key: 'action',
                width: 200,
                render: (text, record) => (
                    <span>
                    <a href="javascript:;" onClick={() => {
                        confirm({
                            content: '确认删除吗？',
                            onOk(){
                                dispatch({type: 'wechatQrcode/del', id: record.id});
                            }
                        })
                    }}>删除</a>
                </span>
                )
            }];

        let QrcodeModalProps = {
            ...qrcodeModal,
            onCancel(){
                dispatch({type: 'qrcodeModal/payload', payload: {visible: false}});
            },
            onOk(data){
                console.log(data);
                dispatch({type: 'qrcodeModal/set', data});
            }
        };

        return <div>
            <Row>
                <Col span={24}>
                    <Row type="flex" justify="end">
                        <Button size="large" style={{marginRight: 8}} onClick={() => {
                            dispatch({type: 'qrcodeModal/payload', payload: {qrcodeType: 2, visible: true, confirmLoading: false}});
                        }}>创建临时二维码</Button>
                        <Button size="large" onClick={() => {
                            dispatch({type: 'qrcodeModal/payload', payload: {qrcodeType: 1, visible: true, confirmLoading: false}});
                        }}>创建永久二维码</Button>
                    </Row>
                </Col>
            </Row>
            <Table dataSource={list}
                   columns={columns}
                   loading={loading}
                   pagination={{
                       total,
                       pageSize: parseInt(pageSize),
                       current: parseInt(page)
                   }}
                   onChange={(pagination, filters, sorter) => {
                       dispatch({type: 'wechatQrcode/payload', payload: {pageSize: pagination.pageSize, page: pagination.current}});
                       dispatch({type: 'wechatQrcode/jumpPage'});
                   }}
                   style={{
                       marginTop: 16
                   }}
                   rowKey={(record) => record.id}/>
            {qrcodeModal.visible ? <QrcodeModal {...QrcodeModalProps}/> : ''}
        </div>;
    }
)