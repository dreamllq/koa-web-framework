/**
 * Created by lvliqi on 2017/6/13.
 */
let baseDB = require('./baseDB');
let adminWechatList = require('./adminWebchatList');

class wxShortLink extends baseDB {
    constructor() {
        super('wx_short_link');
    }

    async getByPage(data, {t = false, query} = {}) {
        let wechat = await adminWechatList.getDefault();
        data.where = `wechat_id=${wechat.id}`;
        return await super.getByPage(data, {t, query});
    }
}

module.exports = new wxShortLink();