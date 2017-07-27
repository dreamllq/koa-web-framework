import React from 'react'
import {connect} from 'dva'
import {Table, Icon, Badge, Row, Col, Button, Select, Upload, Popconfirm} from 'antd'

export default connect(({sysCommonUser}) => ({sysCommonUser}))(
    ({dispatch, sysCommonUser}) => {
        let {page, pageSize, list, loading, total} = sysCommonUser;
        let columns = [
            {
                title: 'UID',
                key: 'id',
                dataIndex: 'id',
                width: 80
            },
            {
                title: '头像',
                key: 'headimgurl',
                width: 80,
                render: (text, record) => <img src={record.cover} width={40} height={40}/>
            },
            {
                title: '昵称',
                key: 'nickname',
                render: (text, record) => (<span>{record.remark ? `${record.remark} （${record.nickname}）` : record.nickname}</span>)
            },
            {
                title: '状态',
                key: 'status',
                render: (text, record) => record.status == 1
                    ? <span><Badge status="success"/> 正常</span>
                    : (record.status == 0 ? <span><Badge status="error"/> 封禁</span> : <span>非法状态</span>)
            },
            {
                title: '操作',
                key: 'action',
                width: 200,
                render: (text, record) => (
                    <span>
                        <Popconfirm title="确认删除此用户吗?" onConfirm={() => {
                            dispatch({type: 'sysCommonUser/del', id: record.id});
                        }}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                        <span className="ant-divider"/>
                        {
                            record.status == 1
                                ? (<Popconfirm title="确认封禁此用户吗?" onConfirm={() => {
                                    dispatch({type: 'sysCommonUser/ban', id: record.id});
                                }}>
                                <a href="javascript:;">封禁</a>
                            </Popconfirm>)
                                : (<Popconfirm title="确认解封此用户吗?" onConfirm={() => {
                                    dispatch({type: 'sysCommonUser/unban', id: record.id});
                                }}>
                                <a href="javascript:;">解封</a>
                            </Popconfirm>)
                        }

                    </span>
                )
            }
        ];
        return <div>

            <Table dataSource={list}
                   columns={columns}
                   loading={loading}
                   pagination={{
                       total,
                       pageSize: parseInt(pageSize),
                       current: parseInt(page)
                   }}
                   onChange={(pagination, filters, sorter) => {
                       dispatch({type: 'sysCommonUser/payload', payload: {pageSize: pagination.pageSize, page: pagination.current}});
                       dispatch({type: 'sysCommonUser/jumpPage'});
                   }}
                   style={{
                       marginTop: 16
                   }}
                   rowKey={(record) => record.id}/>
        </div>
    }
)