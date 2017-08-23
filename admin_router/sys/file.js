const router = require('koa-router')();
const adminFile = require('../../model/adminFile');
const fs = require('mz/fs');
let ppp = require('path');

router.get('/file', async ctx => {
    await ctx.render('admin/index')
});

router.post('/file/add', async ctx => {
    let {path} = ctx.request.body;
    await adminFile.insert({path});
    ctx.success();
});

router.post("/file/all", async ctx => {
    let list = await adminFile.getAllList();
    ctx.success(list);
});

router.post("/file/del", async ctx => {
    let {id} = ctx.request.body;
    await adminFile.delById(id);
    ctx.success();
});

router.post('/file/read', async ctx => {
    let {path} = ctx.request.body;
    let content = await fs.readFile(path, 'utf8');
    ctx.success(content);
});

router.post('/file/write', async ctx => {
    let {path, content} = ctx.request.body;
    await fs.writeFile(path, content, 'utf8');
    ctx.success();
});

router.post('/file/dir', async ctx => {
    let {dir} = ctx.request.body;
    let list = await fs.readdir(dir);
    let dir_arr = [];
    let file_arr = [];
    for (let i = 0; i < list.length; i++) {
        let p = ppp.join(dir, list[i]);
        let stats = await fs.stat(p);
        if (stats.isDirectory()) {
            dir_arr.push({t: 'dir', p, n: list[i]});
        } else if (stats.isFile) {
            file_arr.push({t: 'file', p, n: list[i]});
        }
    }
    ctx.success([...dir_arr, ...file_arr]);
});

module.exports = router;