/**
 * Created by lvliqi on 2017/5/2.
 */
module.exports = wrapper;


function wrapper(pool) {

    let o = {};

    o.query = function (a, b = {}) {
        let p = new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                let query = connection.query(a, b, function (error, results) {
                    connection.release();

                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
                console.log(`sql:${query.sql}`);
            });
        });

        return p;
    };

    return o;
}