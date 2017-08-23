/**
 * Created by lvliqi on 2017/5/15.
 */
const baseDB = require('./baseDB');

class adminFile extends baseDB{
    constructor(){
        super('admin_file');
    }
}

module.exports = new adminFile();