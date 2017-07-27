/**
* Created by lvliqi on 2017/7/20.
*/
const router = require('koa-router')();
const config = require('../../config');

router.post('/chat/get_host', async ctx => {
    ctx.success(config.socket_host);
});

module.exports = router;
