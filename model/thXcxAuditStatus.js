/**
 * Created by lvliqi on 2017/6/13.
 */
let baseDB = require('./baseDB');

class thXcxAuditStatus extends baseDB {
    constructor() {
        super('th_xcx_audit_status');
    }

    async updateByAppid({appid, data}, {t = false, query} = {}) {
        return await this.update({where: `appid='${appid}'`, data: data}, {t, query});
    }


    async updateByAuditid({auditid, data}, {t = false, query} = {}) {
        return await this.update({where: `auditid='${auditid}'`, data: data}, {t, query});
    }


    async updateAuditingByAppid({appid, data}, {t = false, query} = {}) {
        return await this.update({where: `appid='${appid}' and status = 2`, data: data}, {t, query});
    }
}

module.exports = new thXcxAuditStatus();