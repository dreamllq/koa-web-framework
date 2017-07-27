/**
 * Created by lvliqi on 2017/7/18.
 */
const router = require('koa-router')();
const os = require('os');
const adminWechatList = require('../../model/adminWebchatList');
const fs = require('fs');
const imageUtil = require('../../util/image');
const path = require('path');
const uuid = require('uuid');
const apis = require('../../util/wechat');

router.post('/wx/add_image', async ctx => {
    let {medias} = ctx.request.body;
    let tmpDir = os.tmpdir();
    let wechat = await adminWechatList.getDefault();
    let api = await apis(wechat.id);
    let urls = [];
    for (let i = 0; i < medias.length; i++) {
        let data = await api.getMedia(medias[i]);
        if (Buffer.isBuffer(data)) {
            let filePath = path.join(tmpDir, uuid.v1());
            filePath += '.png';
            fs.writeFileSync(filePath, data);

            let fd = await imageUtil.fileGenerrateUrl({
                files: filePath
            });
            fd.forEach(d => {
                urls.push(d.url);
            })
        }
    }
    ctx.success(urls);
});


module.exports = router;
