import React, {Component} from 'react'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import {Table, Icon} from 'antd'
import '../../scss/sysRight.scss'
import ListTitle from '../../components/sysRight/ListTitle'
import GroupModal from '../../components/sysRight/GroupModal'
import SetRightModal from '../../components/sysRight/SetRightModal'


class SysRight extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {dispatch, sysRight, sysRightSetModal} = this.props;
        let {
            page, pageSize, list, loading, total,
            groupModelVisible, groupModelType, groupModelConfirmLoading, groupModelData
        } = sysRight;
        let columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            }, {
                title: '分组名',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '操作',
                key: 'action',
                width: 300,
                render: (text, record) => (
                    <span>
                      <a href="javascript:;" onClick={() => {
                          dispatch({
                              type: 'sysRight/payload', payload: {
                                  groupModelVisible: true,
                                  groupModelType: 'edit',
                                  groupModelData: record
                              }
                          });
                      }}>编辑</a>
                      <span className="ant-divider"/>
                      <a href="javascript:;" onClick={() => {
                          confirm({
                              content: '确定删除吗？', onOk: () => {
                                  dispatch({type: 'sysRight/removeGroup', id: record.id});
                              }
                          })
                      }}>删除</a>
                      <span className="ant-divider"/>
                      <a href="javascript:;" onClick={() => {
                          dispatch({
                              type: 'sysRightSetModal/payload', payload: {
                                  rgid: record.id,
                                  visible: true
                              }
                          });
                          dispatch({type: 'sysRightSetModal/getRights'});

                      }}>设置权限</a>
                    </span>
                ),
            }];
        let ListTitleProps = {
            onAdd(){
                dispatch({
                    type: 'sysRight/payload', payload: {
                        groupModelVisible: true,
                        groupModelType: 'add',
                        groupModelData: {}
                    }
                });
            }
        };

        let GroupModalProps = {
            visible: groupModelVisible,
            title: groupModelType == 'add' ? '添加权限分组' : '编辑权限分组',
            onCancel(){
                dispatch({
                    type: 'sysRight/payload', payload: {
                        groupModelVisible: false,
                    }
                });
            },
            onOk(data){
                dispatch({type: 'sysRight/groupHandle', data});
            },
            confirmLoading: groupModelConfirmLoading,
            item: groupModelData
        };

        let SetRightModalProps = {
            ...sysRightSetModal,
            onCancel(){
                dispatch({
                    type: 'sysRightSetModal/payload', payload: {
                        visible: false,
                    }
                });
            },
            onCheck(keys){
                dispatch({type: 'sysRightSetModal/payload', payload: {keys}});
            },
            onOk(){
                dispatch({type: 'sysRightSetModal/subRight'})
            }
        };


        return <div className="sys_right_container">
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
                       dispatch({type: 'sysRight/payload', payload: {pageSize: pagination.pageSize, page: pagination.current}});
                       dispatch({type: 'sysRight/jumpPage'});
                   }}
                   style={{
                       marginTop: 16
                   }}
                   rowKey={(record) => record.id}/>
            {groupModelVisible ? <GroupModal {...GroupModalProps}/> : ''}
            {sysRightSetModal.visible ? <SetRightModal {...SetRightModalProps}/> : ''}
        </div>
    }
}

export default connect(({sysRight, sysRightSetModal}) => ({sysRight, sysRightSetModal}))(SysRight);