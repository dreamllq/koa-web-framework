/**
 * Created by lvliqi on 2017/7/23.
 */
const thXcxAuditStatus = require('../../model/thXcxAuditStatus');

let success = async ({appid}) => {
    await thXcxAuditStatus.updateAuditingByAppid({
        appid: appid,
        data: {
            status: 0
        }
    })
};

let fail = async ({appid, Reason}) => {
    await thXcxAuditStatus.updateAuditingByAppid({
        appid: appid,
        data: {
            status: 1,
            reason: Reason
        }
    })
};


module.exports.success = success;
module.exports.fail = fail;

