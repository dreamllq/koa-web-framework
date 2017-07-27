import React, {Component} from 'react'
import {connect} from 'dva'
import {Table, Icon, Badge} from 'antd'
import ListTitle from '../../components/wechatSetting/ListTitle'
import WechatModal from '../../components/wechatSetting/WechatModal'
import '../../scss/wechatSetting.scss'

export default connect(({wechatSetting, wechatModal}) => ({wechatSetting, wechatModal}))(({dispatch, location, wechatSetting, wechatModal}) => {

    let {page, pageSize, list, loading, total} = wechatSetting;

    let ListTitleProps = {
        onAdd(){
            dispatch({
                type: 'wechatModal/payload', payload: {
                    visible: true,
                    item: {},
                    title: '添加公众号',
                    confirmLoading: false,
                    type: 'add'
                }
            });
        }
    };
    let columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'APPID',
            dataIndex: 'appid',
            key: 'appid',
        }, {
            title: '是否启动',
            key: 'is_default',
            render: (text, record) => (record.is_default ? <Badge status="success" text="启动"/> : <Badge status="default" text="未启动"/>)
        }, {
            title: '操作',
            key: 'action',
            width: 300,
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={() => {
                        dispatch({
                            type: 'wechatModal/payload', payload: {
                                visible: true,
                                item: record,
                                title: '编辑公众号',
                                confirmLoading: false,
                                type: 'edit'
                            }
                        });
                    }}>编辑</a>
                    <span className="ant-divider"/>
                    <a href="javascript:;" onClick={() => {
                        confirm({
                            content: '确定删除吗？', onOk: () => {
                                dispatch({type: 'wechatSetting/del', id: record.id});
                            }
                        })
                    }}>删除</a>
                    {
                        record.is_default == 0 ? [<span className="ant-divider" key="1"/>,
                            <a key="2" href="javascript:;" onClick={() => {
                                confirm({
                                    content: '确定切换吗？', onOk: () => {
                                        dispatch({type: 'wechatSetting/setDefault', id: record.id});
                                    }
                                })
                            }}>启动</a>] : ''
                    }
                    </span>
            ),
        }];

    const WechatModalProps = {
        ...wechatModal,
        onCancel(){
            dispatch({type: 'wechatModal/payload', payload: {visible: false}});
        },
        onOk(data){
            dispatch({type: `wechatModal/${wechatModal.type}`, data});
        }
    };

    return (<div className="wechat_base_setting">
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
                   dispatch({type: 'wechatSetting/payload', payload: {pageSize: pagination.pageSize, page: pagination.current}});
                   dispatch({type: 'wechatSetting/jumpPage'});
               }}
               style={{
                   marginTop: 16
               }}
               rowKey={(record) => record.id}/>
        {wechatModal.visible ? <WechatModal {...WechatModalProps}/> : ''}
    </div>)
});