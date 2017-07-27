import React from 'react'
import {connect} from 'dva'
import {Table, Icon, Badge, Row, Col, Button, Select, Upload, Pagination} from 'antd'
import MaterialMediaList from '../common/MaterialMediaList'

export default connect(({wechatMaterialImage}) => ({wechatMaterialImage}))(
    ({wechatMaterialImage, dispatch}) => {
        let {page, pageSize, list, loading, total} = wechatMaterialImage;
        let columns = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id'
            }
        ];
        return <div className="wechat_material_image">
            <Row>
                <Col span={20}>
                    <Button size='large'>同步图片数据</Button>
                </Col>
                <Col span={4}>
                    <Row type="flex" justify="end">
                        <Upload multiple={true}
                                showUploadList={false}
                                action='/func/upload/local'
                                onChange={({file}) => {
                                    if (file.status == 'done') {
                                        console.log(file);
                                        let {response} = file;
                                        if (response.errno == 0) {
                                            response.data.forEach(d => {
                                                dispatch({type: 'wechatMaterialImage/upload', filepath: d.dir});
                                            });
                                        }
                                    }
                                }}
                        >
                            {
                                loading ? <Icon type="loading"/> : ''
                            }
                            <Button size="large"><Icon type="upload"/> 上传图片</Button>
                        </Upload>
                    </Row>
                </Col>
            </Row>
            {/*<Table dataSource={list}*/}
            {/*columns={columns}*/}
            {/*loading={loading}*/}
            {/*pagination={{*/}
            {/*total,*/}
            {/*pageSize: parseInt(pageSize),*/}
            {/*current: parseInt(page)*/}
            {/*}}*/}
            {/*onChange={(pagination, filters, sorter) => {*/}
            {/*dispatch({type: 'wechatMaterialImage/payload', payload: {pageSize: pagination.pageSize, page: pagination.current}});*/}
            {/*dispatch({type: 'wechatMaterialImage/jumpPage'});*/}
            {/*}}*/}
            {/*style={{*/}
            {/*marginTop: 16*/}
            {/*}}*/}
            {/*rowKey={(record) => record.id}/>*/}
            <MaterialMediaList list={list}
                               style={{
                                   marginTop: 16
                               }}
            />
            <Row type="flex" justify="end">
                <Pagination pageSize={parseInt(pageSize)} total={total} current={parseInt(page)}/>
            </Row>
        </div>
    }
);