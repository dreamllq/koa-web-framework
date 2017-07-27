/**
 * Created by lvliqi on 2017/7/19.
 */
let app = require('http').createServer();
let io = require('socket.io')(app);

app.listen(global.socket_port);

require('../socket_router/chart')(io);

console.log(`socket server listen ${global.socket_port}`);