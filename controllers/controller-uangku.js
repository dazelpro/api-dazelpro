const async = require("async");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

let mysql = require("mysql");
let pool = mysql.createPool(config);

pool.on("error",(err)=> {
    console.error(err);
});

require('dotenv').config();

const { 
    JWTSECRET
} = process.env;

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
                    let dataInsert = {
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
                        , dataInsert, function (err, createUser) {
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
                    let dataUpdate = {
                        userEmail : req.body.userEmail,
                        userName : req.body.userName,
                        userPhotoUrl : req.body.userPhotoUrl,
                        userStatus : req.body.userStatus
                    };
                    pool.getConnection(function(err, connection) {
                        if (err) throw err;
                        connection.query(
                            `
                            UPDATE uang_users SET ? WHERE userID = ?
                            `
                        , [dataUpdate, req.body.userID], function (err, createUser) {
                            if (err)
                            return res.status(400).send({
                                success: false,
                                message: err
                            });
                            done(err, createUser);
                        });
                        connection.release();
                    })
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
                    , data, function (err, result) {
                        if (err)
                        return res.status(400).send({
                            success: false,
                            message: err
                        });
                        let token = jwt.sign({
                            user: req.body.userID
                        }, JWTSECRET);
                        return res.status(200).send({
                            success: true,
                            token: "Bearer"+ " "+token
                        });
                    });
                    connection.release();
                })
            }
        ], (err) => {
            if (err) return next(err);
        });
    },
    getDataProfile(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM uang_users where userID = ${req.decoded[0].userID} LIMIT 1;
                `
            , function (err, data) {
                if (err)
                return res.status(400).send({
                    success: false,
                    message: err
                });
                return res.status(200).send({
                    success: true,
                    user: data[0]
                });
            });
            connection.release();
        })
    },
    getDataCategory(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM uang_category where categoryUser IN ('2105', '${req.decoded[0].userID}');
                `
            , function (err, data) {
                if (err)
                return res.status(400).send({
                    success: false,
                    message: err
                });
                return res.status(200).send({
                    success: true,
                    data: data,
                    message: "Berhasil ambil data"
                });
            });
            connection.release();
        })
    },
    insertCategory(req,res){
        let data = {
            categoryUser : req.body.userID,
            categoryType : req.body.type,
            categoryDescription : req.body.desc
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO uang_category SET ?
                `
            , data, function (err, result) {
                if (err)
                return res.status(400).send({
                    success: false,
                    message: err
                });
                return res.status(200).send({
                    success: true,
                    data: result,
                    message: "Berhasil insert data"
                });
            });
            connection.release();
        })
    }
}