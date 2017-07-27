import React from 'react'
import {connect} from 'dva'
import {Table, Icon, Badge, Row, Col, Button, Select} from 'antd'

export default connect(({wechatMaterialNews}) => ({wechatMaterialNews}))(({wechatMaterialNews, dispatch}) => {
    let {page, pageSize, list, loading, total} = wechatMaterialNews;

    let columns = [{
        title: '图片',
        key: 'gid',
    }, {
        title: '标题',
        key: 'title',
    }, {
        title: '操作',
        key: 'action',
        width: 200,
        render: (text, record) => (record.gid == 0 || record.gid == 1 || record.gid == 2) ? <span></span> : (
            <span>
                <a href="javascript:;">编辑</a>
                <span className="ant-divider"/>
                <a href="javascript:;">删除</a>
            </span>
        ),
    }];

    return <div className="wechat_material_news">
        <Row>
            <Col span={20}>
                <Button size='large'>同步素材数据</Button>
            </Col>
            <Col span={4}>
                <Row type="flex" justify="end">
                    <Button size="large">创建图文消息</Button>
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
                   dispatch({type: 'wechatMaterialNews/payload', payload: {pageSize: pagination.pageSize, page: pagination.current}});
                   dispatch({type: 'wechatMaterialNews/jumpPage'});
               }}
               style={{
                   marginTop: 16
               }}
               rowKey={(record) => record.id}/>
    </div>
});