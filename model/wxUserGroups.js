/**
 * Created by lvliqi on 2017/6/6.
 */
let baseDB = require('./baseDB');
let adminWechatList = require('./adminWebchatList');

class wxUserGroups extends baseDB {
    constructor() {
        super('wx_user_groups');
    }

    async updateByGid({id, data}) {
        await this.update({where: `gid=${id}`, data});
    }


    async deleteByGid(gid) {
        await this.del({where: `gid=${gid}`});
    }

    async getAllList({where = ''} = {}, {t = false, query} = {}) {
        let wechat = await adminWechatList.getDefault();
        return await super.getAllList({where: `wechat_id=${wechat.id}`});
    }
}

module.exports = new wxUserGroups();