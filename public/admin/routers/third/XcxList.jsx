import React from 'react'
import {connect} from 'dva'
import {Table, Icon, Badge, Row, Col, Button, Select, Upload, Dropdown, Menu, Popconfirm} from 'antd'
import UploadModal from '../../components/thirdXcxList/UploadModal'
import InterfaceModal from "../../components/thirdXcxList/InterfaceModal"
import UserModal from  '../../components/thirdXcxList/UserModal'
import SubmitAuditModal from '../../components/thirdXcxList/SubmitAuditModal'
import ConfigModal from '../../components/thirdXcxList/ConfigModal'


export default connect(({thirdXcxList, uploadModal, interfaceModal, userModal, submitAuditModal, configModal}) => ({thirdXcxList, uploadModal, interfaceModal, userModal, submitAuditModal, configModal}))(
    ({dispatch, thirdXcxList, uploadModal, interfaceModal, userModal, submitAuditModal, configModal}) => {
        let {page, pageSize, list, loading, total} = thirdXcxList;

        let RowBtnGroup = ({record}) => <div>
            <a href="javascript:;" onClick={() => {
                dispatch({
                    type: 'interfaceModal/show', record
                });
            }}>接口地址</a>
            <span className="ant-divider"/>
            <Dropdown overlay={<Menu>
                <Menu.Item>
                    <a href="javascript:;" onClick={() => {
                        dispatch({
                            type: 'userModal/bind', record
                        });
                    }}>添加体验者</a>
                </Menu.Item>
                <Menu.Item>
                    <a href="javascript:;" onClick={() => {
                        dispatch({
                            type: 'userModal/unbind', record
                        });
                    }}>取消体验者</a>
                </Menu.Item>
            </Menu>}>
                <a className="ant-dropdown-link" href="javascript:;">
                    体验者 <Icon type="down"/>
                </a>
            </Dropdown>
            <span className="ant-divider"/>
            <a href={`/h5/third/qrcode?appid=${record.appid}`}>体验二维码</a>
            <span className="ant-divider"/>
            <a href='javascript:;' onClick={() => {
                dispatch({
                    type: 'configModal/payload', payload: {
                        visible: true,
                        record,
                        item: record,
                        confirmLoading: false
                    }
                });
            }}>设置模板参数</a>
            <span className="ant-divider"/>
            <a href="javascript:;" onClick={() => {
                dispatch({
                    type: 'uploadModal/payload', payload: {
                        visible: true,
                        record,
                        confirmLoading: false
                    }
                });
            }}>上传</a>
            <span className="ant-divider"/>
            <a href="javascript:;" onClick={() => {
                dispatch({type: 'submitAuditModal/show', record});
            }}>审核</a>
            <span className="ant-divider"/>
            <Popconfirm title="确认发布小程序吗?" onConfirm={() => {
                dispatch({type: 'thirdXcxList/release', record});
            }}>

                <a href="javascript:;">发布</a>
            </Popconfirm>
            <span className="ant-divider"/>
            <Dropdown overlay={<Menu>
                <Menu.Item>
                    <a href="javascript:;" onClick={() => {
                        dispatch({type: 'thirdXcxList/open', record});
                    }}>开</a>
                </Menu.Item>
                <Menu.Item>
                    <a href="javascript:;" onClick={() => {
                        dispatch({type: 'thirdXcxList/close', record});
                    }}>关</a>
                </Menu.Item>
            </Menu>}>
                <a className="ant-dropdown-link" href="javascript:;">
                    代码开关 <Icon type="down"/>
                </a>
            </Dropdown>
            <span className="ant-divider"/>
            <Popconfirm title="确认更新基本信息吗?" onConfirm={() => {
                dispatch({type: 'thirdXcxList/update_info', record});
            }}>
                <a href="javascript:;">更新基本信息</a>
            </Popconfirm>
        </div>;

        let columns = [
            {
                title: 'appid',
                key: 'appid',
                dataIndex: 'appid'
            },
            {
                title: '名称',
                key: 'nickname',
                dataIndex: 'nickname'
            },
            {
                title: '主体名称',
                key: 'principal_name',
                dataIndex: 'principal_name'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => <RowBtnGroup record={record}/>
            }
        ];
        const UploadModalProps = {
            ...uploadModal,
            onCancel(){
                dispatch({type: 'uploadModal/payload', payload: {visible: false}});
            },
            onOk(data){
                console.log(data);
                dispatch({type: `uploadModal/set`, data});
            }
        };

        const InterfaceModalProps = {
            ...interfaceModal,
            onCancel(){
                dispatch({type: 'interfaceModal/payload', payload: {visible: false}});
            },
            onOk(data){
                console.log(data);
                dispatch({type: `interfaceModal/set`, data});
            }
        };

        const UserModalProps = {
            ...userModal,
            onCancel(){
                dispatch({type: 'userModal/payload', payload: {visible: false}});
            },
            onOk(data){
                console.log(data);
                dispatch({type: `userModal/set`, data});
            }
        };

        const SubmitAuditModalProps = {
            ...submitAuditModal,
            onCancel(){
                dispatch({type: 'submitAuditModal/payload', payload: {visible: false}});
            },
            onOk(data){
                console.log(data);
                dispatch({type: `submitAuditModal/set`, data});
            }
        };

        const ConfigModalProps = {
            ...configModal,
            onCancel(){
                dispatch({type: 'configModal/payload', payload: {visible: false}});
            },
            onOk(data){
                console.log(data);
                dispatch({type: `configModal/set`, data});
            }
        };

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
                       dispatch({type: 'thirdXcxList/payload', payload: {pageSize: pagination.pageSize, page: pagination.current}});
                       dispatch({type: 'thirdXcxList/jumpPage'});
                   }}
                   style={{
                       marginTop: 16
                   }}
                   rowKey={(record) => record.id}/>

            {uploadModal.visible ? <UploadModal {...UploadModalProps}/> : ''}
            {interfaceModal.visible ? <InterfaceModal {...InterfaceModalProps}/> : ''}
            {userModal.visible ? <UserModal {...UserModalProps}/> : ''}
            {submitAuditModal.visible ? <SubmitAuditModal {...SubmitAuditModalProps}/> : ''}
            {configModal.visible ? <ConfigModal {...ConfigModalProps}/> : ''}
        </div>;
    }
)