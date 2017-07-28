/**
 * Created by lvliqi on 2017/7/19.
 */
const Util = require('../../util/socket.io');
const co = require('co');

module.exports = (io) => {
    let sockets = {};
    let nsp = io.of('/chat');

    nsp.on('connection', (socket) => {
        sockets[socket.id] = socket;
        socket.on('disconnect', (reason) => {
            delete sockets[socket.id];
        });

        socket.on('joinroom', ({roomId}) => {
            // console.log(socket.request.headers.cookie);
            let cookie = Util.getCookie(socket);
            let {uid, token} = cookie;
            socket.emit('msg', {type: 1, data: '加入房间失败'});
        });

        socket.on('chatmsg', ({msg, roomId}) => {
            let cookie = Util.getCookie(socket);
            let {uid, token} = cookie;
            socket.emit('msg', {type: 1, data: '消息发送失败'});
        });
    });
};