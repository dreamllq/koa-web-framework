/**
 * Created by lvliqi on 2017/4/27.
 */
import React from 'react';
import {Router, Route, IndexRoute, IndexRedirect} from 'dva/router';

const cached = {};

function registerModel(app, model) {
    if (!cached[model.namespace]) {
        app.model(model);
        cached[model.namespace] = 1;
    }
}


export default ({history, app}) => {
    return (
        <Router history={history}>
            <Route path="/admin" getComponent={(nextState, cb) => {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/app'));
                    cb(null, require('./routers/App'))
                }, 'App')
            }}>
                <IndexRedirect to="sys"/>
                <Route path='login' getComponent={(nextState, cb) => {
                    require.ensure([], (require) => {
                        registerModel(app, require('./models/app'));
                        registerModel(app, require('./models/login'));
                        cb(null, require('./routers/Login'))
                    }, 'Login')
                }}/>
                <Route path='sys'>
                    <IndexRedirect to="dashboard"/>
                    <Route path='dashboard'/>
                    <Route path='user' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/sysUser/sysUser'));
                            registerModel(app, require('./models/sysUser/rightModal'));
                            cb(null, require('./routers/sys/SysUser'))
                        }, 'SysUser')
                    }}/>
                    <Route path='right' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/sysRight/sysRight'));
                            registerModel(app, require('./models/sysRight/sysRightSetModal'));
                            cb(null, require('./routers/sys/SysRight'))
                        }, 'SysRight')
                    }}/>
                    <Route path='platform'/>
                    <Route path='commonUser' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/sysCommonUser/commonUser'));
                            cb(null, require('./routers/sys/SysCommonUser'))
                        }, 'SysCommonUser')
                    }}/>
                    <Route path='file' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/sysFile/sysFile'));
                            registerModel(app, require('./models/sysFile/sysFileAdd'));
                            registerModel(app, require('./models/sysFile/sysFileEdit'));
                            cb(null, require('./routers/sys/SysFile'))
                        }, 'SysFile')
                    }}/>
                </Route>

                <Route path='wechat'>
                    <IndexRedirect to="baseSetting"/>
                    <Route path='baseSetting' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/wechatSetting/setting'));
                            registerModel(app, require('./models/wechatSetting/wechatModal'));
                            cb(null, require('./routers/wechat/BaseSetting'))
                        }, 'BaseSetting')
                    }}/>
                    <Route path='user' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/wechatUser/user'));
                            registerModel(app, require('./models/wechatUser/remarkModal'));
                            cb(null, require('./routers/wechat/User'))
                        }, 'User')
                    }}/>
                    <Route path='ugroup' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/wechatUGroup/group'));
                            registerModel(app, require('./models/wechatUGroup/groupModal'));
                            cb(null, require('./routers/wechat/UGroup'))
                        }, 'UGroup')
                    }}/>
                    <Route path='material' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/wechatMaterial/news'));
                            registerModel(app, require('./models/wechatMaterial/image'));
                            registerModel(app, require('./models/wechatMaterial/voice'));
                            registerModel(app, require('./models/wechatMaterial/video'));
                            registerModel(app, require('./models/wechatMaterial/material'));
                            cb(null, require('./routers/wechat/Material'))
                        }, 'Material')
                    }}/>
                    <Route path='qrcode' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/wechatQrcode/qrcode'));
                            registerModel(app, require('./models/wechatQrcode/qrcodeModal'));
                            cb(null, require('./routers/wechat/QrCode'))
                        }, 'QrCode')
                    }}/>
                    <Route path='mass' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('./routers/wechat/Mass'))
                        }, 'Mass')
                    }}/>
                    <Route path='shortLink' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/wechatShortLink/shortLink'));
                            registerModel(app, require('./models/wechatShortLink/shortLinkModal'));
                            cb(null, require('./routers/wechat/ShortLink'))
                        }, 'ShortLink')
                    }}/>
                    <Route path='menu' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('./routers/wechat/Menu'))
                        }, 'Menu')
                    }}/>
                    <Route path='kf' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('./routers/wechat/Kf'))
                        }, 'Kf')
                    }}/>
                </Route>

                <Route path='cms'>
                    <Route path='test' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('./routers/cms/Test'))
                        }, 'Test')
                    }}/>
                    <Route path='editor' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('./routers/cms/Editor'))
                        }, 'Editor')
                    }}/>
                </Route>

                <Route path='third'>
                    <Route path='xcx_list' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/thirdXcxList/xcxList'));
                            registerModel(app, require('./models/thirdXcxList/uploadModal'));
                            registerModel(app, require('./models/thirdXcxList/interfaceModal'));
                            registerModel(app, require('./models/thirdXcxList/userModal'));
                            registerModel(app, require('./models/thirdXcxList/submitAuditModal'));
                            registerModel(app, require('./models/thirdXcxList/configModal'));
                            cb(null, require('./routers/third/XcxList'))
                        }, 'XcxList')
                    }}/>
                    <Route path='xcx_audit' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/thirdXcxAudit/xcxAudit'));
                            cb(null, require('./routers/third/XcxAudit'))
                        }, 'XcxAudit')
                    }}/>
                    <Route path='xcx_setting' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require('./routers/third/XcxSetting'))
                        }, 'XcxSetting')
                    }}/>
                </Route>
            </Route>
        </Router>
    );
}

