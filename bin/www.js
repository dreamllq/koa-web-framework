/**
 * Created by lvliqi on 2017/5/1.
 */
const config = require('../config');

global.env = process.env.NODE_ENV || 'development';
global.socket_port = config.socket_port || process.env.NODE_PORT || 3000;
global.port = config.port || process.env.NODE_PORT || 3000;

console.log(`env:${global.env}`);
