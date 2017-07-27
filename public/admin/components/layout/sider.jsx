import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {Menu, Breadcrumb, Icon, Switch} from 'antd'
const SubMenu = Menu.SubMenu;
import {Link} from 'dva/router'


let makeMenu = function (menu = [], siderFold, show) {
    return menu.map(m => {
        if (m.button && m.button.length > 0) {
            return <SubMenu key={m.k} title={<span>{!show ? <Icon type={m.icon || 'appstore-o'}/> : ''}{(siderFold && !show) ? '' : m.name}</span>}>
                {
                    makeMenu(m.button, siderFold, 1)
                }
            </SubMenu>
        } else {
            return <Menu.Item key={m.k}>
                <Link to={m.uri}>{<span>{!show ? <Icon type={m.icon || 'appstore-o'}/> : ''}{(siderFold && !show) ? '' : m.name}</span>}</Link>
            </Menu.Item>
        }
    });
};

const getSelectKey = (menu, location, menuOpenConfig) => {

    let config = menuOpenConfig[location.pathname];
    if (!config) return {};
    let m = [];

    menu.forEach(d => {
        if (d.k == config.top[0]) {
            m = d.button;
        }
    });

    return {
        selected: JSON.parse(JSON.stringify(config.left)),
        m: m
    }

};

export default ({darkTheme, changeTheme, siderFold, menu, location, menuOpenConfig, adminName, adminNameSmall}) => {
    let {m, selected} = getSelectKey(menu, location, menuOpenConfig);
    return (<div>
        <div className="ant-layout-logo">{!siderFold ? adminName : adminNameSmall}</div>
        <Menu mode={siderFold ? "vertical" : "inline"}
              theme={darkTheme ? "dark" : 'light'}
              selectedKeys={selected}
              defaultOpenKeys={selected}>
            {
                makeMenu(m, siderFold)
            }
        </Menu>
        {!siderFold ?
            <div className='switch-theme'>
                <span><Icon type="bulb"/>切换主题</span>
                <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="黑" unCheckedChildren="白"/>
            </div> : ""}
    </div>)
}