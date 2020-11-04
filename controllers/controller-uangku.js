const async = require("async");
const config = require("../config/database");

let mysql = require("mysql");
const { user } = require("../config/database");
let pool = mysql.createPool(config);

pool.on("error",(err)=> {
    console.error(err);
});

module.exports ={
    auth(req,res){
        async.waterfall([
            (done) => {
                // Cek User
                pool.getConnection(function(err, connection) {
                    if (err) throw err;
                    connection.query(
                        `
                        SELECT * FROM uang_users where userStatus = 0;
                        `
                    , function (err, userCek) {
                        if (err)
                        return res.status(400).send({
                            success: false,
                            message: err
                        });
                        done(err, userCek);
                    });
                    connection.release();
                })
            },
            (userCek, done) => {
                console.log(userCek[0])
                pool.getConnection(function(err, connection) {
                    if (err) throw err;
                    connection.query(
                        `
                        SELECT * FROM uang_category;
                        `
                    , function (err, category) {
                        if (err)
                        return res.status(400).send({
                            success: false,
                            message: err
                        });
                        return res.status(200).send({
                            success: true,
                            data: userCek[0]
                        });
                    });
                    connection.release();
                })
            }
        ], (err) => {
            if (err) return next(err);
        });
    }
}