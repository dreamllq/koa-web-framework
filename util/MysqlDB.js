const mysql = require('mysql');
const wrapper = require('./dbWrapper');
const config = require('../config');
const pool = mysql.createPool(config.mysql);
const db = wrapper(pool);
module.exports = db;