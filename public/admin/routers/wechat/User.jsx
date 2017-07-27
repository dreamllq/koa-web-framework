import React, {Component} from 'react'
import {connect} from 'dva'
import {Table, Icon, Badge, Row, Col, Button, Select} from 'antd'
const Option = Select.Option;
import RemarkModal from '../../components/wechatUser/RemarkModal'

export default connect(({wechatUser, remarkModal}) => ({wechatUser, remarkModal}))(({wechatUser, remarkModal, dispatch}) => {

    let {page, pageSize, list, loading, total, asyncStatus, asyncError, groups} = wechatUser;

    let columns = [
        {
            title: '头像',
            key: 'headimgurl',
            width: 80,
            render: (text, record) => <img src={record.headimgurl} width={40} height={40}/>
        }, {
            title: '昵称',
            key: 'nickname',
            render: (text, record) => (<span>{record.remark ? `${record.remark} （${record.nickname}）` : record.nickname}</span>)
        }, {
            title: '性别',
            key: 'sex',
            render: (text, record) => {
                switch (record.sex) {
                    case 1:
                        return <span>男</span>;
                    case 2:
                        return <span>女</span>;
                    default:
                        return <span>未设置</span>
                }
            }
        }, {
            title: '关注',
            key: 'subscribe',
            render: (text, record) => (<span>{record.subscribe == 1 ? '已关注' : '未关注'}</span>)
        }, {
            title: '位置',
            key: 'position',
            render: (text, record) => (<span>{`${record.country} ${record.province} ${record.city}`}</span>)
        }, {
            title: '语言信息',
            key: 'language',
            dataIndex: 'language'
        }, {
            title: '分组',
            key: 'groupid',
            render: (text, record) => <Select defaultValue={record.groupid.toString()} style={{width: 120}} onChange={(value) => {
                dispatch({type: 'wechatUser/moveUserToGroup', gid: value, openid: record.openid});
            }}>
                {
                    groups.map(d => <Option value={d.gid.toString()} key={d.gid}>{d.name}</Option>)
                }
            </Select>
        }, {
            title: '操作',
            key: 'action',
            width: 200,
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={() => {
                        dispatch({
                            type: 'remarkModal/payload', payload: {
                                visible: true,
                                item: {
                                    remark: record.remark
                                },
                                id: record.id
                            }
                        });

                    }}>修改备注</a>
                </span>
            )
        }];
    const RemarkModalProps = {
        ...remarkModal,
        onCancel(){
            dispatch({type: 'remarkModal/payload', payload: {visible: false}});
        },
        onOk(data){
            dispatch({type: `remarkModal/set`, data});
        }
    };

    const AsyncUserBtn = () => <Col span={4}>
        {
            (() => {
                switch (asyncStatus) {
                    case 1:
                    case '1':
                        return <Button type="ghost" size='large' onClick={() => dispatch({type: 'wechatUser/claarAsyncUserStatus'})}><Badge status="success"/> 同步成功</Button>;
                        break;
                    case 2:
                    case '2':
                        return <Button type="ghost" size='large' onClick={() => dispatch({type: 'wechatUser/asyncUserStatus'})}><Badge status="processing"/> 同步中</Button>;
                        break;
                    case 3:
                    case '3':
                        return <Button type="danger" size='large' onClick={() => {
                            confirm({
                                title: '清除错误状态吗？',
                                content: asyncError,
                                onOk(){
                                    dispatch({type: 'wechatUser/claarAsyncUserStatus'})
                                }
                            })
                        }}><Badge status="error"/> 同步错误</Button>;
                        break;
                    default:
                        return <Button type="primary" size='large' onClick={() => {
                            confirm({
                                content: '确认同步数据吗？',
                                onOk(){
                                    dispatch({type: 'wechatUser/asyncUser'})
                                }
                            })
                        }}>同步用户数据</Button>;
                        break;
                }
            })()
        }
    </Col>;

    return (<div className="wechat_user">
        <div>
            <Row type="flex" justify="start">
                <AsyncUserBtn/>
            </Row>
        </div>
        <Table dataSource={list}
               columns={columns}
               loading={loading}
               pagination={{
                   total,
                   pageSize: parseInt(pageSize),
                   current: parseInt(page)
               }}
               onChange={(pagination, filters, sorter) => {
                   dispatch({type: 'wechatUser/payload', payload: {pageSize: pagination.pageSize, page: pagination.current}});
                   dispatch({type: 'wechatUser/jumpPage'});
               }}
               style={{
                   marginTop: 16
               }}
               rowKey={(record) => record.id}/>
        {remarkModal.visible ? <RemarkModal {...RemarkModalProps}/> : ''}

    </div>)
})