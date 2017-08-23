import React from 'react'
import {Row, Button, Table, Popconfirm} from 'antd'
import {connect} from 'dva'
import SysFileAddModal from '../../components/sysFile/SysFileAddModal'
import SysFileEditModal from '../../components/sysFile/SysFileEditModal'

export default connect(({sysFileAdd, sysFile, sysFileEdit}) => ({sysFileAdd, sysFile, sysFileEdit}))(
    ({dispatch, sysFileAdd, sysFile, sysFileEdit}) => {
        let {list} = sysFile;

        let SysFileAddModalProps = {
            ...sysFileAdd,
            onCancel() {
                dispatch({type: 'sysFileAdd/payload', payload: {visible: false}});
            },
            onOk(data) {
                dispatch({type: 'sysFileAdd/set', data});
            }
        };

        let columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            }, {
                title: '文件路径',
                dataIndex: 'path',
                key: 'path',
            }, {
                title: '操作',
                key: 'action',
                width: 300,
                render: (text, record) => (
                    <div>
                        <a href="javascript:;" onClick={() => {
                            dispatch({type: 'sysFile/readFile', path: record.path});
                        }}>读/写文件</a>
                        <span className="ant-divider"/>
                        <Popconfirm title="确认删除吗?" onConfirm={() => {
                            dispatch({type: 'sysFile/del', id: record.id});
                        }}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                    </div>
                ),
            }];

        let SysFileEditModalProps = {
            ...sysFileEdit,
            onCancel() {
                dispatch({type: 'sysFileEdit/payload', payload: {visible: false}});
            },
            onOk(data) {
                dispatch({type: 'sysFileEdit/set', data});
            }
        };
        return <div>
            <Row>
                <Button onClick={() => {
                    dispatch({type: 'sysFileAdd/payload', payload: {visible: true}});
                }}>添加文件</Button>
            </Row>

            <Table dataSource={list}
                   columns={columns}
                   style={{
                       marginTop: 16
                   }}
                   pagination={false}
                   rowKey={(record) => record.id}/>

            {sysFileAdd.visible ? <SysFileAddModal {...SysFileAddModalProps}/> : ''}
            {sysFileEdit.visible ? <SysFileEditModal {...SysFileEditModalProps}/> : ''}

        </div>;
    }
)