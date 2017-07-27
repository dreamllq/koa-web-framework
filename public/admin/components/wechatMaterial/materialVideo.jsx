import React from 'react'
import {connect} from 'dva'

export default connect(({wechatMaterialVideo}) => ({wechatMaterialVideo}))(({wechatMaterialVideo, dispatch}) => {

    return <div className="wechat_material_video">wechat_material_video</div>
});