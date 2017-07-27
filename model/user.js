/**
 * Created by lvliqi on 2017/6/6.
 */
let baseDB = require('./baseDB');
let base64 = require('../util/base64');

class user extends baseDB {
    constructor() {
        super('user');
    }

    async getByUnionid(unionid) {
        return this.getOne({where: `wx_unionid='${unionid}'`});
    }


    async getByPage(data, {t = false, query} = {}) {
        let pageData = await super.getByPage(data, {t, query});
        pageData.list = pageData.list.map(d => {
            d.nickname = base64.decode(d.nickname);
            return d;
        });
        return pageData;
    }

    async banById(id) {
        return await this.updateById({id, data: {status: 0}});
    }

    async unbanById(id) {
        return await this.updateById({id, data: {status: 1}});
    }
}

module.exports = new user();