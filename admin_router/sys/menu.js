/**
 * Created by lvliqi on 2017/5/2.
 */
const router = require('koa-router')();
const admin_menu = require('../../model/adminMenu');
const admin_user_right = require('../../model/adminUserRight');
const admin_right_group = require('../../model/adminRightGroup');
const admin_right_group_detail = require('../../model/adminRightGroupDetail');
const admin_right_base = require('../../model/adminRightBase');
const errcode = require('../../config/errcode');

router.post('/menu/list', async ctx => {
    let user = ctx.session.user;

    let userRight = await admin_user_right.getByUid(user.id);
    if (!userRight) {
        return ctx.error(errcode.NO_CONFIG_RIGHT);
    }
    let rgid = userRight.rgid;
    let rightGroup = await admin_right_group.getById(rgid);
    if (!rightGroup) {
        return ctx.error(errcode.NO_RGID);
    }

    if (rightGroup.is_super == 1) {
        let row = await admin_menu.menu();
        ctx.success(row);
    } else {
        let rightDetail = await admin_right_group_detail.getFuncRight(rgid);
        let rightMenu = await admin_right_group_detail.getMneuRight(rgid);
        let rbIds = rightDetail.map(d => d.rbid);
        let rightBase = [];
        if (rbIds.length > 0) {
            rightBase = await admin_right_base.getByIds(rbIds);
        }

        let row = await admin_menu.menu(rightMenu, rightBase);
        ctx.success(row);
    }
});

module.exports = router;