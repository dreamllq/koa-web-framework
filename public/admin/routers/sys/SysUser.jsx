import React, {Component} from 'react'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import {Table} from 'antd'
import UserModal from '../../components/sysUser/UserModal'
import RightModal from '../../components/sysUser/RightModal'
import ListTitle from '../../components/sysUser/ListTitle'
import '../../scss/user.scss'

class SysUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {dispatch, sysUser, location, sysUserRightModal} = this.props;

        let {
            loading, search,
            list, modelVisible, modelConfirmLoading, modelType, modelData,
            page, pageSize, total
        } = sysUser;

        let columns = [{
            title: '账户',
            dataIndex: 'account',
            key: 'account',
        }, {
            title: '操作',
            key: 'action',
            width: 300,
            render: (text, record) => (
                <span>
                    <a href="javascript:;">编辑</a>
                    <span className="ant-divider"/>
                    <a href="javascript:;" onClick={() => {
                        confirm({
                            content: '确定删除吗？', onOk: () => {
                                dispatch({type: 'sysUser/removeUser', id: record.id});
                            }
                        })
                    }}>删除</a>
                    <span className="ant-divider"/>
                    <a href="javascript:;" onClick={() => {
                        dispatch({type: 'sysUserRightModal/payload', payload: {visible: true, uid: record.id}});
                        dispatch({type: 'sysUserRightModal/getData'});
                    }}>设置权限</a>
                    <span className="ant-divider"/>
                    <a href="javascript:;" onClick={() => {
                        confirm({
                            content: '确定重置密码吗？', onOk: () => {
                                dispatch({type: 'sysUser/resetPWD', id: record.id});
                            }
                        })
                    }}>重置密码</a>
                </span>
            ),
        }];

        const ListTitleProps = {
            keyword: search,
            onSearch({keyword}){
                dispatch({type: 'sysUser/payload', payload: {search: keyword, page: 1}});
                dispatch({type: 'sysUser/jumpPage'});
            },
            onAdd(){
                dispatch({
                    type: 'sysUser/payload', payload: {
                        modelType: 'add',
                        modelVisible: true,
                        modelData: {}
                    }
                });
            }
        };

        let UserModalProps = {
            visible: modelVisible,
            title: modelType == 'add' ? '添加管理员' : '编辑管理员',
            onCancel(){
                dispatch({type: 'sysUser/payload', payload: {modelVisible: false}});
            },
            onOk(data){
                dispatch({type: 'sysUser/submit', ...data});
            },
            confirmLoading: modelConfirmLoading,
            item: modelData
        };

        let RightModalProps = {
            ...sysUserRightModal,
            onCancel(){
                dispatch({type: 'sysUserRightModal/payload', payload: {visible: false}});
            },
            onOk(data){
                dispatch({type: 'sysUserRightModal/submit', ...data});
            },
        };

        return (
            <div className="sys_user_container">
                <ListTitle {...ListTitleProps}/>
                <Table dataSource={list}
                       columns={columns}
                       loading={loading}
                       pagination={{
                           total,
                           pageSize: parseInt(pageSize),
                           current: parseInt(page)
                       }}
                       onChange={(pagination, filters, sorter) => {
                           console.log(pagination);
                           dispatch({type: 'sysUser/payload', payload: {pageSize: pagination.pageSize, page: pagination.current}});
                           dispatch({type: 'sysUser/jumpPage'});
                       }}
                       style={{
                           marginTop: 16
                       }}
                       rowKey={(record) => record.id}/>
                {modelVisible ? <UserModal {...UserModalProps}/> : ''}
                {sysUserRightModal.visible ? <RightModal {...RightModalProps}/> : ''}
            </div>
        )
    }
}

export default connect(({sysUser, sysUserRightModal}) => ({sysUser, sysUserRightModal}))(SysUser);