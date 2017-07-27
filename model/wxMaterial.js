/**
 * Created by lvliqi on 2017/6/13.
 */
let baseDB = require('./baseDB');
let adminWechatList = require('./adminWebchatList');

class wxMaterial extends baseDB {
    constructor() {
        super('wx_material');
    }

    async clear(type) {
        await this.del({where: `\`type\`='${type}'`});
    }


    async getByPage(data, {t = false, query} = {}) {
        let wechat = await adminWechatList.getDefault();
        data.where = `wechat_id=${wechat.id} and \`type\`='${data.type}'`;
        return await super.getByPage(data, {t, query});
    }
}

module.exports = new wxMaterial();