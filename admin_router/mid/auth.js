/**
 * Created by lvliqi on 2017/5/26.
 */
const admin_right_base = require('../../model/adminRightBase');
const admin_right_group_detail = require('../../model/adminRightGroupDetail');
const admin_user_right = require('../../model/adminUserRight');
const admin_right_group = require('../../model/adminRightGroup');
const admin_menu = require('../../model/adminMenu');
const errcode = require('../../config/errcode');

module.exports = async (ctx, next) => {
    let {user} = ctx.session;
    let {method, url} = ctx.request;
    if (method == 'POST') {
        let rightBase = await admin_right_base.getByUri(url);
        if (!rightBase) {
            await next();
            return;
        }
        let rbid = rightBase.id;
        let userRight = await admin_user_right.getByUid(user.id);
        if (!userRight) {
            await next();
            return;
        }

        let rgid = userRight.rgid;

        let rightGroup = await admin_right_group.getById(rgid);
        if (!rightGroup) {
            await next();
            return;
        }

        let {is_super} = rightGroup;
        if (is_super == 1) {
            await next();
            return;
        }


        let rightDetail = await admin_right_group_detail.getRight({rgid, rbid});
        if (!rightDetail) {
            ctx.error(errcode.NO_RIGHT);
        } else {
            await next();
        }
    } else if (method == 'GET') {
        let menu = await admin_menu.getByUri(url);
        if (!menu) {
            await next();
            return;
        }
        let id = menu.k;
        let userRight = await admin_user_right.getByUid(user.id);
        if (!userRight) {
            await next();
            return;
        }
        let rgid = userRight.rgid;

        let rightGroup = await admin_right_group.getById(rgid);
        if (!rightGroup) {
            await next();
            return;
        }
        if (rightGroup.is_super == 1) {
            await next();
            return;
        }
        let rightDetail = await admin_right_group_detail.getFuncRight(rgid);
        let rightMenu = await admin_right_group_detail.getMneuRight(rgid);
        let rbIds = rightDetail.map(d => d.rbid);
        let rightBase = [];
        if (rbIds.length > 0) {
            rightBase = await admin_right_base.getByIds(rbIds);
        }
        let row = await admin_menu.getParentMenu(rightMenu, rightBase);
        if (row[id]) {
            await next();
        } else {
            let keys = Object.keys(row);

            if (keys.length == 0) {
                await next()
            } else {
                ctx.redirect(row[keys[0]].uri);
            }
        }
    }
};