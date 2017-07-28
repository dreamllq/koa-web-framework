/**
 * Created by lvliqi on 2017/7/21.
 */
const xml2json = require('xml2js');
const Q = require('q');

let parseString = async (xml) => {
    let defer = Q.defer();

    xml2json.parseString(xml, {explicitArray: false}, (err, result) => {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    });

    return defer.promise;
};

module.exports.parseString = parseString;