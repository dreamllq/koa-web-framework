/**
 * Created by lvliqi on 2017/7/17.
 */
module.exports = {
    port: 3000,
    socket_port:2999,
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: 'Lvliqi@#1314',
        database: 'koa',
        multipleStatements: true
    },
    redis: {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        family: 4,           // 4 (IPv4) or 6 (IPv6)
        password: '',
        db: 0
    },
    session: {
        key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
        maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
        overwrite: true, /** (boolean) can overwrite or not (default true) */
        httpOnly: true, /** (boolean) httpOnly or not (default true) */
        signed: true, /** (boolean) signed or not (default true) */
    }
};