import React from 'react'
import '../../scss/materialMediaList.scss'
import {Table, Icon, Badge, Row, Col, Button, Select, Upload} from 'antd'

const ImageItem = ({onSelect, onDelete, onClick, index, media_id, data, name}) => (
    <div className="image_item">
        <div className="img" style={{
            backgroundImage: `url(http://localhost:3000/func/image/html/show?url=${encodeURIComponent(JSON.parse(data).url)})`
        }}></div>
        <div className="name">{name}</div>
        <div className="bottom">
            <div className="item"><Icon type="edit"/></div>
            <div className="item"><Icon type="delete"/></div>
        </div>
    </div>
);


export default ({list, onSelect, onDelete, onClick, type, style}) => {
    let MediaItem = null;

    switch (type) {
        case "image":
            MediaItem = ImageItem;
            break;
        default:
            MediaItem = ImageItem;
            break;
    }

    let MediaItemProps = {
        onSelect, onDelete, onClick
    };

    return <div className="media_list" style={style}>
        {
            list.map((d, i) => <MediaItem key={i} {...d} {...MediaItemProps} index={i}/>)
        }
    </div>
}