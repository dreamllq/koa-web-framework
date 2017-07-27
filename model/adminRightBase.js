/**
 * Created by lvliqi on 2017/5/15.
 */
const baseDB = require('./baseDB');

class adminRightBase extends baseDB {
    constructor() {
        super('admin_right_base');
    }

    async getByUri(uri) {
        return await this.getOne({where: `uri='${uri}'`});
    }

    async getByIds(ids) {
        return await this.getAllList({where: `id in (${ids.join(',')})`});
    }
}

module.exports = new adminRightBase();