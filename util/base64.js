/**
 * Created by lvliqi on 2017/6/6.
 */
module.exports.encode = (str) => {
    return new Buffer(str).toString('base64');
};

module.exports.decode = (str) => {
    return new Buffer(str, 'base64').toString()
};