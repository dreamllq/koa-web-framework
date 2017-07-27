import React from 'react'
import {Button, Row, Col} from 'antd';
import './cmsBaseComponent.scss'

class CmsBaseComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            insertShow, insertComponent,
            sortShow, sortShowBottom, sortComponent,
            name, className, style, id,
            onDel, onEdit,
            onDragStart, onDragEnd, onDragOver,
            isSort, isInsert
        } = this.props;

        return <div className="cms_base_component"
                    onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver} draggable={true}
        >
            {
                insertShow ? <div className="insert_component">{insertComponent}</div> : ''
            }
            {
                sortShow ? <div className="sort_component">{sortComponent}</div> : ''
            }

            <Row className={`component_block ${className} ${(isSort || isInsert) ? 'index' : ''}`} align="center" justify="center" type="flex" style={style}>
                <Col span={12}><span>{name}_${id}</span></Col>
                <Col span={12}><Button type="primary" shape="circle" icon="delete" onClick={onDel}/>
                    <Button type="primary" shape="circle" icon="edit" onClick={onEdit}/></Col>
            </Row>

            {
                sortShowBottom ? <div className="sort_component">{sortComponent}</div> : ''
            }
        </div>
    }
}

export default CmsBaseComponent;