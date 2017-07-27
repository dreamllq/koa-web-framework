/**
 * Created by lvliqi on 2017/5/15.
 */
const baseDB = require('./baseDB');
const mysql = require('mysql');

class adminRightGroupDetail extends baseDB {
    constructor() {
        super('admin_right_group_detail');
    }

    async insertAll({list, rgid}) {
        let data = {
            rgid,
        };
        data.create_time = Math.floor(Date.now() / 1000);
        data.update_time = Math.floor(Date.now() / 1000);
        list = list.map(d => {
            data.rbid = d.id;
            data.type = d.type;
            return mysql.format(`insert into ${this.name} set ?`, data);
        });
        await this.mutil(list)
    }

    async getRight({rgid, rbid}) {
        return await this.getOne({where: `type=1 and rgid=${rgid} and rbid=${rbid}`});
    }

    async getMneuRight(rgid) {
        return await this.getAllList({where: `rgid=${rgid} and type=2`});
    }

    async getFuncRight(rgid) {
        return await this.getAllList({where: `rgid=${rgid} and type=1`});
    }

    async getRightList(rgid) {
        return await this.getList({where: `rgid=${rgid}`});
    }

    async delRight(rgid) {
        return await this.del({where: `rgid=${rgid}`});
    }
}

module.exports = new adminRightGroupDetail();