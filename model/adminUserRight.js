/**
 * Created by lvliqi on 2017/5/15.
 */
const baseDB = require('./baseDB');

class adminUserRight extends baseDB {
    constructor() {
        super('admin_user_right');
    }

    async getByUid(uid) {
        return await this.getOne({
            where: `uid=${uid}`
        });
    }
}

module.exports = new adminUserRight();