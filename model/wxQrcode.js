/**
 * Created by lvliqi on 2017/6/13.
 */
let baseDB = require('./baseDB');
let adminWechatList = require('./adminWebchatList');

class wxQrcode extends baseDB {
    constructor() {
        super('wx_qrcode');
    }

    async getByPage(data, {t = false, query} = {}) {
        let wechat = await adminWechatList.getDefault();
        data.where = `wechat_id=${wechat.id}`;
        return await super.getByPage(data, {t, query});
    }
}

module.exports = new wxQrcode();