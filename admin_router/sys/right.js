/**
 * Created by lvliqi on 2017/5/2.
 */
const router = require('koa-router')();
const adminMenu = require('../../model/adminMenu');
const adminRightBase = require('../../model/adminRightBase');
const adminRightGroup = require('../../model/adminRightGroup');
const adminRightGroupDetail = require('../../model/adminRightGroupDetail');
const errcode = require('../../config/errcode');

/**
 * 权限分组页面
 */
router.get('/right', async ctx => {
    await ctx.render('admin/index')
});

/**
 * 权限分组列表 分页逻辑
 */
router.post('/right/group_list', async ctx => {
    let {page, pageSize} = ctx.request.body;
    let data = await adminRightGroup.getByPage({page, pageSize, where: "is_super=0"});
    ctx.success(data);
});

/**
 * 获取全部权限分组
 */
router.post('/right/group_all_list', async ctx => {
    let data = await adminRightGroup.getAllList();
    ctx.success(data);
});

/**
 * 添加权限分组
 */
router.post('/right/add_group', async ctx => {
    let {name} = ctx.request.body;
    let {id} = await adminRightGroup.insert({name});
    ctx.success({id});
});

/**
 * 编辑权限分组
 */
router.post('/right/edit_group', async ctx => {
    let {id, name} = ctx.request.body;
    await adminRightGroup.update({
        where: `id=${id}`,
        data: {name}
    });
    ctx.success();
});

/**
 * 删除权限分组
 */
router.post('/right/remove_group', async ctx => {
    let {id} = ctx.request.body;
    await adminRightGroup.delById(id);
    ctx.success();
});

/**
 * 修改权限分组详情
 * list:[object] object:{id:0,type:1}
 */
router.post('/right/add_group_detail', async ctx => {
    let {list, rgid} = ctx.request.body;
    list = JSON.parse(list);
    let rows = await adminRightGroup.getById(rgid);
    if (!rows) {
        ctx.error(errcode.NO_RGID);
    } else {
        await adminRightGroupDetail.delRight(rgid);
        if (list) {
            await adminRightGroupDetail.insertAll({list, rgid});
        }
        ctx.success();
    }
});


/**
 * 权限分组详情
 */
router.post('/right/group_detail_info', async ctx => {
    let {rgid} = ctx.request.body;
    let rows = await adminRightGroup.getById(rgid);
    if (!rows) {
        ctx.error(errcode.NO_RGID);
    } else {
        let list = await adminRightGroupDetail.getRightList(rgid);
        ctx.success(list);
    }
});

/**
 * 获取所有权限树
 */
router.post('/right/all_right_list', async ctx => {
    let menu = await adminMenu.getAllList();
    let rightBase = await adminRightBase.getAllList();
    let button = adminMenu.rightTree(menu, rightBase);

    ctx.success(button);
});


module.exports = router;