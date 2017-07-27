import React from 'react'
import {Button} from 'antd'

export default ({onAdd})=>(
    <div className="sys_user_bar">
        <div className="user_bar_creat">
            <Button type="ghost" size="large" onClick={onAdd}>添加</Button>
        </div>
    </div>
)