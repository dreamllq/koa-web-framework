import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {Menu, Breadcrumb, Icon} from 'antd'
import {Link} from 'dva/router'


export default ({menu, menuOpenConfig}) => {
    let config = menuOpenConfig[location.pathname];
    const b = [];
    let current_m = [];
    menu.forEach(d => {
        if (d.k == config.top[0]) {
            b.push(d);
            current_m = d.button;
        }
    });

    for (let i = 0; i < config.left.length; i++) {
        let k = config.left[i];
        current_m.forEach(d => {
            if (d.k == k) {
                b.push(d);
                current_m = d.button;
            }
        });
    }

    return (
        <div className="ant-layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb.Item><Link to={menu.length > 0 ? menu[0].uri : ""}>首页</Link></Breadcrumb.Item>
                {
                    b.map(d => <Breadcrumb.Item key={d.k}><Link to={d.uri}>{d.name}</Link></Breadcrumb.Item>)
                }
            </Breadcrumb>
        </div>
    )
}