/**
 * Created by lvliqi on 2017/7/21.
 */
let urllib = require('urllib');
let Q = require('q');

let request = async (url, options) => {
    let {data} = await urllib.request(url, options);
    console.log(`request::${options.method}::${url}::${options.data}::${JSON.stringify(data)}`);
    return data;
};

module.exports.doPost = async ({url, data}) => {
    return await request(url, {
        dataType: 'json',
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })


};

module.exports.doGet = async ({url, data}) => {
    return await request(url, {
        dataType: 'json',
        method: 'GET',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
};