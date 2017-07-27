import React from 'react'
import {connect} from 'dva'
import {Table, Icon, Badge, Row, Col, Button, Select, Upload} from 'antd'
import ShortLinkModal from '../../components/wechatShortLink/ShortLinkModal'

export default connect(({wechatShortLink, shortLinkModal}) => ({wechatShortLink, shortLinkModal}))(
    ({dispatch, wechatShortLink, shortLinkModal}) => {
        let {page, pageSize, list, loading, total} = wechatShortLink;
        let columns = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id'
            },
            {
                title: '原链接',
                key: 'link',
                render: (text, record) => <a href={record.link} target="_blank">{record.link}</a>
            },
            {
                title: '短链接',
                key: 'short_link',
                render: (text, record) => <a href={record.short_link} target="_blank">{record.short_link}</a>
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
                                dispatch({type: 'wechatShortLink/del', id: record.id});
                            }
                        })
                    }}>删除</a>
                </span>
                )
            }
        ];

        let ShortLinkModalProps = {
            ...shortLinkModal,
            onCancel(){
                dispatch({type: 'shortLinkModal/payload', payload: {visible: false}});
            },
            onOk(data){
                console.log(data);
                dispatch({type: 'shortLinkModal/set', data});
            }
        };
        return <div>
            <Row>
                <Col span={24}>
                    <Row type="flex" justify="end">
                        <Button size="large" onClick={() => {
                            dispatch({type: 'shortLinkModal/payload', payload: {visible: true, confirmLoading: false}});
                        }}>生成短连接</Button>
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
                       dispatch({type: 'wechatShortLink/payload', payload: {pageSize: pagination.pageSize, page: pagination.current}});
                       dispatch({type: 'wechatShortLink/jumpPage'});
                   }}
                   style={{
                       marginTop: 16
                   }}
                   rowKey={(record) => record.id}/>
            {shortLinkModal.visible ? <ShortLinkModal {...ShortLinkModalProps}/> : ''}
        </div>;
    }
)