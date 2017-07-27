/**
 * Created by lvliqi on 2017/7/27.
 */
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const convert = require('koa-convert');
const session = require("koa-session2");
const Store = require("../util/Store");
const Router = require('koa-router');
const views = require('koa-views');
const config = require('../config');
const router = new Router();
const h5RouterIndex = require('../h5_router');
const adminRouterIndex = require('../admin_router');
const funcRouterIndex = require('../func_router');
const errcode = require('../config/errcode');
const compress = require('koa-compress');

app.keys = ['some secret hurr'];
config.session.store = new Store();
app.use(compress());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}));
app.use(bodyParser());
app.use(logger());

app.use(session(config.session));

//中间件 ctx绑定统一接口返回方法
app.use(async (ctx, next) => {
    ctx.success = (data) => {
        ctx.body = {
            errno: 0,
            errdesc: 'success',
            data: data
        }
    };

    ctx.error = ({errno, errdesc}) => {
        ctx.body = {
            errno: errno,
            errdesc: errdesc
        }
    };

    await next();
});

//中间件 错误统一处理
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        console.error(e);
        ctx.error(errcode.COMMON_ERROR);
    }
});


router.get('', (ctx) => ctx.redirect('/admin'));
router.use('', h5RouterIndex.routes(), h5RouterIndex.allowedMethods());
router.use('', funcRouterIndex.routes(), funcRouterIndex.allowedMethods());
router.use('', adminRouterIndex.routes(), adminRouterIndex.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', err =>
    console.error(err)
);

app.listen(global.port);

console.log(`web server listen port:${global.port}`);