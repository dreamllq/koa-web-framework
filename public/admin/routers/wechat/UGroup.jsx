import React from 'react'
import {connect} from 'dva'
import {Table, Icon, Badge, Row, Col, Button} from 'antd'
import GroupModal from '../../components/wechatUGroup/GroupModal'

export default connect(({wechatUGroup, wechatUGroupModal}) => ({wechatUGroup, wechatUGroupModal}))(({wechatUGroup, wechatUGroupModal, dispatch}) => {
    let {list} = wechatUGroup;

    let columns = [{
        title: 'id',
        dataIndex: 'gid',
        key: 'gid',
    }, {
        title: '分组名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '分组用户数',
        dataIndex: 'count',
        key: 'count',
    }, {
        title: '操作',
        key: 'action',
        width: 200,
        render: (text, record) => (record.gid == 0 || record.gid == 1 || record.gid == 2) ? <span></span> : (
            <span>
                <a href="javascript:;" onClick={() => {
                    dispatch({type: 'wechatUGroupModal/payload', payload: {id: record.gid, visible: true, type: 'update', title: '修改分组名称', item: record}});
                }}>修改分组名称</a>
                <span className="ant-divider"/>
                <a href="javascript:;" onClick={() => {
                    confirm({
                        content: '确认删除数据吗？',
                        onOk(){
                            dispatch({type: 'wechatUGroup/deleteGroup', id: record.gid});
                        }
                    })
                }}>删除</a>
            </span>
        ),
    }];

    const GroupModalProps = {
        ...wechatUGroupModal,
        onCancel(){
            dispatch({type: 'wechatUGroupModal/payload', payload: {visible: false}});
        },
        onOk(data){
            dispatch({type: `wechatUGroupModal/${wechatUGroupModal.type}`, data});
        }
    };

    return <div className="wechat_ugroup">
        <Row type="flex" justify="start">
            <Col span={20}>
                <Button size='large' onClick={() => {
                    confirm({
                        content: '确认同步数据吗？',
                        onOk(){
                            dispatch({type: 'wechatUGroup/asyncGroup'})
                        }
                    })
                }}>更新用户分组</Button>
            </Col>
            <Col span={4}>
                <Row type="flex" justify="end"><Button size='large' onClick={() => {
                    dispatch({type: 'wechatUGroupModal/payload', payload: {visible: true, type: 'add', title: '创建分组'}});
                }}>创建分组</Button></Row>
            </Col>
        </Row>
        <Table dataSource={list}
               columns={columns}
               style={{
                   marginTop: 16
               }}
               pagination={false}
               rowKey={(record) => record.id}/>
        {wechatUGroupModal.visible ? <GroupModal {...GroupModalProps}/> : ''}
    </div>
})