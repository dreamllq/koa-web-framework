/**
 * Created by lvliqi on 2017/5/2.
 */
let baseDB = require('./baseDB');

class adminUser extends baseDB {
    constructor() {
        super('admin_user');
    }

}

module.exports = new adminUser();