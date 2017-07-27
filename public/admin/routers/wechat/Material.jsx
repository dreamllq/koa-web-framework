import React from 'react'
import {connect} from 'dva'
import {Menu, Row, Col, Button} from 'antd'
const MenuItem = Menu.Item;
import MaterialImage from '../../components/wechatMaterial/materialImage'
import MaterialNews from '../../components/wechatMaterial/materialNews'
import MaterialVideo from '../../components/wechatMaterial/materialVideo'
import MaterialVoice from '../../components/wechatMaterial/materialVoice'

export default connect(({wechatMaterial, wechatMaterialImage}) => ({wechatMaterial, wechatMaterialImage}))(({dispatch, wechatMaterial, location, wechatMaterialImage}) => {
    let {selectedKeys} = wechatMaterial;
    let Material = null;
    switch (selectedKeys) {
        case 'news':
            Material = MaterialNews;
            break;
        case 'image':
            Material = MaterialImage;
            break;
        case 'voice':
            Material = MaterialVoice;
            break;
        case 'video':
            Material = MaterialVideo;
            break;
        default:
            Material = MaterialNews;
            break;
    }

    return <div className="wechat_material">

        <Menu mode="horizontal" selectedKeys={[selectedKeys]}
              onClick={(e) => {
                  let {key} = e;
                  dispatch({type: 'wechatMaterial/changeMenu', key, location});
              }}>
            <MenuItem key="news">图文消息</MenuItem>
            <MenuItem key="image">图片</MenuItem>
            <MenuItem key="voice">语音</MenuItem>
            <MenuItem key="video">视频</MenuItem>
        </Menu>
        <div style={{marginTop: 16}}>
            <Material/>
        </div>
    </div>
});