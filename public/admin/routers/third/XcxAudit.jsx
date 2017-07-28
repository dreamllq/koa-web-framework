import React from 'react'
import {connect} from 'dva'
import {Table, Icon, Badge, Row, Col, Button, Select, Upload, Dropdown, Menu} from 'antd'
import moment from 'moment'

let AuditStatus = ({status}) => {
    if (status == 0) {
        return <Badge status="success" text="审核成功"/>;
    } else if (status == 1) {
        return <Badge status="error" text="审核失败"/>;
    } else if (status == 2) {
        return <Badge status="processing" text="审核中"/>;
    } else if (status == 3) {
        return <Badge status="default" text="已上线"/>;
    }
};

export default connect(
    ({
         thirdXcxAudit
     }) => ({
        thirdXcxAudit
    })
)(
    ({dispatch, thirdXcxAudit}) => {
        let {page, pageSize, list, loading, total} = thirdXcxAudit;

        let RowBtnGroup = ({record}) => <span>
            <a href="javascript:;" onClick={() => {
                dispatch({type: 'thirdXcxAudit/updateStatus', record});
            }}>更新审核状态</a>
        </span>;
        let columns = [
            {
                title: 'appid',
                key: 'appid',
                dataIndex: 'appid',
                width: 145
            },
            {
                title: '审核编码',
                key: 'auditid',
                dataIndex: 'auditid',
                width: 85
            },
            {
                title: '审核结果',
                key: 'status',
                render: (text, record) => <AuditStatus {...record}/>,
                width: 85
            },
            {
                title: '结果描述',
                key: 'reason',
                render: (text, record) => <span dangerouslySetInnerHTML={{__html: record.reason}}></span>
            },
            {
                title: '提交时间',
                key: 'create_time',
                render: (text, record) => moment.unix(record.create_time).format('YYYY-MM-DD HH:mm:ss'),
                width: 140
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => <RowBtnGroup record={record}/>,
                width: 95
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
                       dispatch({type: 'thirdXcxAudit/payload', payload: {pageSize: pagination.pageSize, page: pagination.current}});
                       dispatch({type: 'thirdXcxAudit/jumpPage'});
                   }}
                   style={{
                       marginTop: 16
                   }}
                   rowKey={(record) => record.id}/>
        </div>
    }
)