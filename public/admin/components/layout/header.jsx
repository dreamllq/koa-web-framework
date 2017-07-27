import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {Menu, Breadcrumb, Icon} from 'antd'
const SubMenu = Menu.SubMenu;
import {Link} from 'dva/router'


export default ({siderFold, switchSider, user, onLogout, menu, location, menuOpenConfig}) => (
    <div className="ant-layout-header" style={{backgroundColor: '#fff'}}>
        <div className='sider-button' onClick={switchSider}>
            <Icon type={siderFold ? "menu-unfold" : "menu-fold"}/>
        </div>
        <Menu className="header-menu" mode="horizontal" style={{float: 'right'}}
              onClick={(item, key, keyPath) => {
                  if (item.key == 'logout') {
                      onLogout();
                  }
              }}
              selectedKeys={menuOpenConfig[location.pathname] && menuOpenConfig[location.pathname].top}
        >
            {
                menu.map(m => <Menu.Item key={m.k}>
                    <Link to={m.button[0].uri}><span>{m.name}</span></Link>
                </Menu.Item>)
            }
            <SubMenu title={< span > <Icon type="user"/>{user.account}</span>}>
                <Menu.Item key="logout">
                    <a>注销</a>
                </Menu.Item>
            </SubMenu>
        </Menu>
    </div>)