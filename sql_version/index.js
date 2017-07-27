/**
 * Created by lvlq on 16/3/19.
 */
require('../bin/www');
const fs = require("fs");
const Q = require("q");
const mysql = require('mysql');
const config = require('../config');
const pool = mysql.createPool(config.mysql);

const dbver = `CREATE TABLE \`dbver\` (
  \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT,
  \`ver\` int(11) DEFAULT NULL,
  \`changelog\` varchar(255) DEFAULT NULL,
  \`dateline\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;`;

/**
 * 获取最大版本
 * @param table
 * @returns {promise|*|Promise}
 */
let getTableDbver = function () {
    let defer = Q.defer();

    pool.query('select max(ver) as ver from dbver', function (err, data, fields) {
        if (err) {
            pool.query(dbver, function () {
                defer.resolve(0);
            });
            // defer.reject(err);
        } else {
            let ver = data[0].ver;
            if (ver) {
                defer.resolve(ver);
            } else {
                defer.resolve(0);
            }
        }
    });

    return defer.promise;
};


/**
 * 获取sql文件夹集
 * @returns {Array}
 */
let getTables = function () {
    let files = fs.readdirSync(__dirname);
    let dir = [];
    for (let i = 0; i < files.length; i++) {
        let stat = fs.statSync(__dirname + "/" + files[i]);
        if (stat.isDirectory()) {
            dir.push(files[i]);
        }
    }
    return dir;
};

/**
 * 获取sql文件集
 * @param table
 * @param ver
 * @returns {Array}
 */
let getTableVerFile = function (table, ver) {
    let table_path = __dirname + "/" + table;
    let files = fs.readdirSync(table_path);
    let f = [];
    for (let i = 0; i < files.length; i++) {
        let stat = fs.statSync(table_path + "/" + files[i]);
        if (stat.isFile()) {
            let v = parseInt(files[i].split(".")[0]);
            if (v > ver) {
                f.push(table_path + "/" + files[i]);
            }
        }
    }

    return f;
};

let doTableVer = function (files) {
    let defer = Q.defer();

    doTableVer1(files, 0, function (err) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve();
        }
    });
    return defer.promise;
};

let doTableVer1 = function (files, index, cb) {

    if (index < files.length) {
        let sqls = fs.readFileSync(files[index], 'utf8');
        let sql_arr = getAllSql(sqls);
        doAllSql(sql_arr, 0, function (err) {
            if (err) {
                cb(err);
            } else {
                console.log(files[index] + "... complete.");
                index++;
                doTableVer1(files, index, cb);
            }
        });
    } else {
        cb(null);
    }
};

let getAllSql = function (sqls) {
    sqls = sqls.replace(/\n/g, "");
    let arr = sqls.split(";");
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != "") {
            result.push(arr[i] + ";")
        }
    }
    return result;
};

let doAllSql = function (sql_arr, index, cb) {
    if (index < sql_arr.length) {
        doSQL(sql_arr[index]).then(function () {
            index++;
            doAllSql(sql_arr, index, cb);
        }).catch(function (err) {
            cb(err);
        });
    } else {
        cb(null);
    }
};

let doSQL = function (sql) {
    let defer = Q.defer();
    pool.query(sql, function (err) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve();
        }
    });
    return defer.promise;
};

let doAll = function (tables, index) {
    if (index < tables.length) {
        let table = tables[index];
        getTableDbver().then(function (ver) {
            let files = getTableVerFile(table, ver);
            doTableVer(files).then(function () {
                index++;
                doAll(tables, index);
            }).catch(function (err) {
                console.log("Error::" + err.message);
            })
        });
    } else {
        console.log("complete.");
        process.exit();
    }
};
let tables = getTables();
doAll(tables, 0);