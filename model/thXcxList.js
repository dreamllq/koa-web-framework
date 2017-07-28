/**
 * Created by lvliqi on 2017/6/13.
 */
let baseDB = require('./baseDB');

class thXcxList extends baseDB {
    constructor() {
        super('th_xcx_list');
    }

    async updataByAppid({appid, data}, {t = false, query} = {}) {
        return await this.update({where: `appid='${appid}'`, data: data}, {t, query});
    }

    async getByAppid(appid, {t = false, query} = {}) {
        return await this.getOne({where: `appid='${appid}'`}, {t, query});
    }

    async delByAppid(appid, {t = false, query} = {}) {
        await this.del({where: `appid='${appid}'`}, {t, query});
    }
}

module.exports = new thXcxList();