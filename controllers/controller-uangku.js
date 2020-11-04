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
                pool.getConnection(function(err, connection) {
                    if (err) throw err;
                    connection.query(
                        `
                        SELECT * FROM uang_users where userID = ${req.body.userID} LIMIT 1;
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
                if (userCek[0] === undefined){
                    let data = {
                        userID : req.body.userID,
                        userEmail : req.body.userEmail,
                        userName : req.body.userName,
                        userPhotoUrl : req.body.userPhotoUrl,
                        userStatus : req.body.userStatus
                    };
                    pool.getConnection(function(err, connection) {
                        if (err) throw err;
                        connection.query(
                            `
                            INSERT INTO uang_users SET ?
                            `
                        , data, function (err, createUser) {
                            if (err)
                            return res.status(400).send({
                                success: false,
                                message: err
                            });
                            done(err, createUser);
                        });
                        connection.release();
                    })
                } else {
                    done();
                }
            },
            (createUser, done) => {
                let data = {
                    logUser : req.body.userID,
                    logIpAddress : req.clientIp,
                    logDevice : req.useragent.platform,
                    logOs : req.useragent.os,
                    logBrowser : req.useragent.browser,
                }
                pool.getConnection(function(err, connection) {
                    if (err) throw err;
                    connection.query(
                        `
                        INSERT INTO uang_history_login SET ?
                        `
                    , data, function (err, createUser) {
                        if (err)
                        return res.status(400).send({
                            success: false,
                            message: err
                        });
                        return res.status(200).send({
                            success: true,
                            message: done
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