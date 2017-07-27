/**
 * Created by lvliqi on 2017/6/5.
 */
let baseDB = require('./baseDB');
let base64 = require('../util/base64');
let adminWechatList = require('./adminWebchatList');

const USER_DEFAULT_HEADER = '/images/default/wx_default_header.jpg';

class wxUser extends baseDB {
    constructor() {
        super('wx_user');
    }

    async getByOpenid(openid) {
        return this.getOne({where: `openid='${openid}'`});
    }


    async getByUnionid(unionid) {
        return this.getOne({where: `unionid='${unionid}'`});
    }

    async updateByOpenid(openid, data) {
        if (data.tagid_list)
            data.tagid_list = JSON.stringify(data.tagid_list);
        if (data.privilege)
            data.privilege = JSON.stringify(data.privilege);
        if (data.nickname)
            data.nickname = base64.encode(data.nickname);
        if (data.headimgurl === '')
            data.headimgurl = data.headimgurl || USER_DEFAULT_HEADER;
        return this.update({where: `openid='${openid}'`, data})
    }

    async insert(data, {t = false, query} = {}) {
        data.create_time = Math.floor(Date.now() / 1000);
        data.update_time = Math.floor(Date.now() / 1000);
        if (data.tagid_list)
            data.tagid_list = JSON.stringify(data.tagid_list);
        if (data.privilege)
            data.privilege = JSON.stringify(data.privilege);
        data.nickname = base64.encode(data.nickname);
        data.headimgurl = data.headimgurl || USER_DEFAULT_HEADER;
        return await super.insert(data, {t, query});
    }

    async saveUpdate(data) {
        let {openid} = data;
        let u = await this.getByOpenid(openid);
        if (u) {
            await this.updateByOpenid(openid, data);
        } else {
            await this.insert(data);
        }
    }

    async getByPage(data, {t = false, query} = {}) {
        let wechat = await adminWechatList.getDefault();
        data.where = `wechat_id=${wechat.id}`;
        let pageData = await super.getByPage(data, {t, query});
        pageData.list = pageData.list.map(d => {
            d.nickname = base64.decode(d.nickname);
            return d;
        });
        return pageData;
    }
}

module.exports = new wxUser();