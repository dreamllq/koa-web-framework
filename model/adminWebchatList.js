/**
 * Created by lvliqi on 2017/6/2.
 */
let baseDB = require('./baseDB');

class adminWebchatList extends baseDB {
    constructor() {
        super('admin_webchat_list');
    }

    async getDefault() {
        return this.getOne({where: 'is_default=1'});
    }
}

module.exports = new adminWebchatList();