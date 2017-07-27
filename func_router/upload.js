/**
 * Created by lvliqi on 2017/6/2.
 */
const router = require('koa-router')();
const Q = require('q');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
const imageUtil = require('../util/image');

const UPLOAD_TYPE_LOCAL = 1;
const UPLOAD_TYPE_CDN = 2;

router.post('/upload/local', async ctx => {
    let d = await receiveFile(ctx.req);

    let files = await imageUtil.fileGenerrateUrl({
        type: UPLOAD_TYPE_LOCAL,
        files: d
    });
    ctx.success(files);
});


let receiveFile = async (req) => {
    let defer = Q.defer();

    let form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        } else {
            let f = [];
            Object.keys(files).forEach(d => f = [...f, ...files[d]]);
            defer.resolve(f);
        }
    });

    return defer.promise;
};


module.exports = router;
