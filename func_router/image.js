/**
 * Created by lvliqi on 2017/6/14.
 */
const router = require('koa-router')();
const request = require('request');

router.get('/image/html/show', async ctx => {
    let {url} = ctx.query;
    ctx.body = request(url);
});


module.exports = router;