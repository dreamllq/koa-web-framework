/**
 * Created by lvliqi on 2017/8/3.
 */
const router = require('koa-router')();

router.post('/user/guest', ctx => {
    ctx.success();
});

router.post('/user/login', ctx => {
    ctx.success();
});

router.post('/user/info', ctx => {
    ctx.success();
});

router.post('/user/regist', ctx => {
    ctx.success();
});
module.exports = router;
