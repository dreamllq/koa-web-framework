/**
 * Created by lvliqi on 2017/5/15.
 */
const baseDB = require('./baseDB');

class adminRightGroup extends baseDB{
    constructor(){
        super('admin_right_group');
    }
}

module.exports = new adminRightGroup();