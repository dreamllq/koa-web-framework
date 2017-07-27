/**
 * Created by lvliqi on 2017/3/10.
 */
const Redis = require("ioredis");
const config = require('../config');

let redis = new Redis(config.redis);
module.exports = redis;