/**
 * Created by lvliqi on 2017/5/2.
 */
const db = require('../util/MysqlDB');

class baseDB {
    constructor(name) {
        this.name = name;
        this.db = db;
        this.query = this.db.query;
    }

    async insert(data, {t = false, query} = {}) {
        let q = t ? query : this.query;

        data.create_time = Math.floor(Date.now() / 1000);
        data.update_time = Math.floor(Date.now() / 1000);
        let {affectedRows, insertId} = await q(`insert into ${this.name} set ?`, data);
        return {num: affectedRows, id: insertId}
    }


    async delById(id, {t = false, query} = {}) {
        let q = t ? query : this.query;

        return await q(`delete from ${this.name} where id=${id}`);
    }

    async del({where}, {t = false, query} = {}) {
        let q = t ? query : this.query;

        return await q(`delete from ${this.name} where ${where}`);
    }

    async updateById({id, data = {}}, {t = false, query} = {}) {
        let q = t ? query : this.query;

        data.update_time = Math.floor(Date.now() / 1000);
        return await  q(`update ${this.name} set ? where id=${id}`, data);
    }

    async update({where, data = {}}, {t = false, query} = {}) {
        let q = t ? query : this.query;

        data.update_time = Math.floor(Date.now() / 1000);
        return await q(`update ${this.name} set ? where ${where}`, data);
    }

    async getById(id, {t = false, query} = {}) {
        return this.getOne({where: `id=${id}`}, {t, query});
    }

    async getByPage({page = 1, pageSize = 10, where = '', filed = [], order = ['id', 'desc']}, {t = false, query} = {}) {
        let list = await this.getList({where, order, filed, limit: [(page - 1) * pageSize, pageSize]}, {t, query});
        let allData = await this.getAllList({where}, {t, query});
        return {
            total: allData.length,
            all_page: Math.ceil(allData.length / pageSize),
            list,
            pageSize: pageSize
        }
    }

    async getAllList({where = ''} = {}, {t = false, query} = {}) {
        let q = t ? query : this.query;

        return await q(`select * from ${this.name} ${where == '' ? '' : `where ${where} `}`);
    }


    async getOne({where = ''}, {t = false, query} = {}) {
        let list = await this.getList({where, limit: [0, 1]}, {t, query});
        return list.length == 0 ? null : list[0];
    }

    async getList({where = '', filed = [], order = ['id', 'asc'], limit = [0, 1000]}, {t = false, query} = {}) {
        let q = t ? query : this.query;

        let sql = `select ${filed.length == 0 ? '*' : filed.join(',')} from ${this.name} ${where == '' ? '' : `where ${where} `} order by ${order.join(' ')} limit ${limit.join(',')}`;
        return await q(sql);
    }

    async mutil(list, {t = false, query} = {}) {
        let q = t ? query : this.query;

        let sql = list.join(';');
        return await q(sql);
    }

    async truncate() {
        let sql = `truncate table ${this.name}`;
        return await this.query(sql);
    }
}

module.exports = baseDB;