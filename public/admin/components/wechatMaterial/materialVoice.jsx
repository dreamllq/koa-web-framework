import React from 'react'
import {connect} from 'dva'

export default connect(({wechatMaterialVoice}) => ({wechatMaterialVoice}))(({wechatMaterialVoice, dispatch}) => {

    return <div className="wechat_material_voice">wechat_material_voice</div>
});