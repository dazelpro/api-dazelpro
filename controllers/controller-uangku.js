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
    editDataProfile(req,res){
        let dataUpdate = {
            userName : req.body.nama,
            userBio : req.body.bio,
            userPhone : req.body.telp
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE uang_users SET ? WHERE userID = ?
                `
            , [dataUpdate, req.decoded[0].userID], function (err, data) {
                if (err)
                return res.status(400).send({
                    success: false,
                    message: err
                });
                return res.status(200).send({
                    success: true,
                    message: "Berhasil edit data"
                });
            });
            connection.release();
        })
    },
    getDataDashboard(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                -- Get Saldo
                SELECT 
                (SELECT IFNULL(SUM(inAmt), 0) AS masuk FROM 
                    uang_cash_in JOIN uang_users 
                ON userID = inUser 
                WHERE userID = ${req.decoded[0].userID})-
                (SELECT IFNULL(SUM(outAmt), 0) AS masuk FROM 
                    uang_cash_out JOIN uang_users 
                ON userID = outUser 
                WHERE userID = ${req.decoded[0].userID})
                AS totalSaldo;

                -- Get Top 4 Uang Masuk
                SELECT * FROM uang_cash_in 
                    JOIN uang_users 
                ON userID = inUser 
                    JOIN uang_category 
                ON inCategory = categoryID
                WHERE categoryType = 0 
                    AND userID = ${req.decoded[0].userID}
                ORDER BY inCreateAt DESC
                LIMIT 4;

                -- Get Top 4 Uang keluar
                SELECT * FROM uang_cash_out 
                    JOIN uang_users 
                ON userID = outUser 
                    JOIN uang_category 
                ON outCategory = categoryID
                WHERE categoryType = 1 
                    AND userID = ${req.decoded[0].userID}
                ORDER BY outCreateAt DESC
                LIMIT 4;
                `
            , function (err, data) {
                if (err)
                return res.status(400).send({
                    success: false,
                    message: err
                });
                return res.status(200).send({
                    success: true,
                    data: data
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
                SELECT * FROM uang_category WHERE categoryType = '0' AND categoryUser IN ('2105', '${req.decoded[0].userID}');
                SELECT * FROM uang_category WHERE categoryType = '1' AND categoryUser IN ('2105', '${req.decoded[0].userID}');
                `
            , function (err, data) {
                if (err)
                return res.status(400).send({
                    success: false,
                    message: err
                });
                return res.status(200).send({
                    success: true,
                    in: data[0],
                    out: data[1],
                    message: "Berhasil ambil data"
                });
            });
            connection.release();
        })
    },
    insertCategory(req,res){
        let data = {
            categoryUser : req.decoded[0].userID,
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
                    message: "Berhasil simpan data"
                });
            });
            connection.release();
        })
    },
    updateCategory(req,res){
        let dataUpdate = {
            categoryDescription : req.body.desc
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE uang_category SET ? WHERE categoryID = ?
                `
            , [dataUpdate, req.body.id], function (err, data) {
                if (err)
                return res.status(400).send({
                    success: false,
                    message: err
                });
                return res.status(200).send({
                    success: true,
                    message: "Berhasil edit data"
                });
            });
            connection.release();
        })
    },
    deleteCategory(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM uang_category WHERE categoryID = ?
                `
            , [req.body.id], function (err, data) {
                if (err)
                return res.status(400).send({
                    success: false,
                    message: err
                });
                return res.status(200).send({
                    success: true,
                    message: "Berhasil hapus data"
                });
            });
            connection.release();
        })
    },
    getDataTransactionIn(req,res){
        let param = req.params["id"];
        let queryParam = '';
        if (param == 0) {
            queryParam = `
                SELECT * FROM uang_cash_in 
                JOIN uang_category 
                    ON categoryID = inCategory 
                JOIN uang_users 
                    ON inUser = userID 
                WHERE userID = ${req.decoded[0].userID}
                    AND DATE(inCreateAt) = DATE(NOW())
                ORDER BY inCreateAt DESC;
            `
        } else if (param == 1) {
            queryParam = `
                SELECT * FROM uang_cash_in
                JOIN uang_category 
                    ON categoryID = inCategory 
                JOIN uang_users 
                    ON inUser = userID 
                WHERE userID = ${req.decoded[0].userID}
                    AND inCreateAt BETWEEN ADDDATE(NOW(),-7) AND NOW() 
                ORDER BY inCreateAt DESC;
            `
        } else if (param == 2) {
            queryParam = `
                SELECT * FROM uang_cash_in
                JOIN uang_category 
                    ON categoryID = inCategory 
                JOIN uang_users 
                    ON inUser = userID 
                WHERE userID = ${req.decoded[0].userID}
                    AND inCreateAt BETWEEN NOW() - INTERVAL 30 DAY AND NOW()
                ORDER BY inCreateAt DESC;
            `
        }  else if (param == 3) {
            queryParam = `
                SELECT * FROM uang_cash_in
                JOIN uang_category 
                    ON categoryID = inCategory 
                JOIN uang_users 
                    ON inUser = userID 
                WHERE userID = ${req.decoded[0].userID}
                ORDER BY inCreateAt DESC;
            `
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `${queryParam}`
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
    getDataTransactionOut(req,res){
        let param = req.params["id"];
        let queryParam = '';
        if (param == 0) {
            queryParam = `
                SELECT * FROM uang_cash_out 
                JOIN uang_category 
                    ON categoryID = outCategory 
                JOIN uang_users 
                    ON outUser = userID 
                WHERE userID = ${req.decoded[0].userID}
                    AND DATE(outCreateAt) = DATE(NOW())
                ORDER BY outCreateAt DESC;
            `
        } else if (param == 1) {
            queryParam = `
                SELECT * FROM uang_cash_out 
                JOIN uang_category 
                    ON categoryID = outCategory 
                JOIN uang_users 
                    ON outUser = userID 
                WHERE userID = ${req.decoded[0].userID}
                    AND outCreateAt BETWEEN ADDDATE(NOW(),-7) AND NOW() 
                ORDER BY outCreateAt DESC;
            `
        } else if (param == 2) {
            queryParam = `
                SELECT * FROM uang_cash_out 
                JOIN uang_category 
                    ON categoryID = outCategory 
                JOIN uang_users 
                    ON outUser = userID 
                WHERE userID = ${req.decoded[0].userID}
                    AND outCreateAt BETWEEN NOW() - INTERVAL 30 DAY AND NOW()
                ORDER BY outCreateAt DESC;
            `
        }  else if (param == 3) {
            queryParam = `
                SELECT * FROM uang_cash_out 
                JOIN uang_category 
                    ON categoryID = outCategory 
                JOIN uang_users 
                    ON outUser = userID 
                WHERE userID = ${req.decoded[0].userID}
                ORDER BY outCreateAt DESC;
            `
        }
        // console.log(queryParam)
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `${queryParam}`
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
    insertTransactionIn(req,res){
        let data = {
            inUser : req.decoded[0].userID,
            inCategory : req.body.idCategory,
            inDescription : req.body.desc,
            inAmt : req.body.amt
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO uang_cash_in SET ?
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
                    message: "Berhasil simpan data"
                });
            });
            connection.release();
        })
    },
    insertTransactionOut(req,res){
        let data = {
            outUser : req.decoded[0].userID,
            outCategory : req.body.idCategory,
            outDescription : req.body.desc,
            outAmt : req.body.amt
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO uang_cash_out SET ?
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
                    message: "Berhasil simpan data"
                });
            });
            connection.release();
        })
    },
    updateTransactionIn(req,res){
        let data = {
            inCategory : req.body.idCategory,
            inDescription : req.body.desc,
            inAmt : req.body.amt,
            inCreateAt : req.body.date
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE uang_cash_in SET ? WHERE inID = ?
                `
            , [data, req.body.id], function (err, result) {
                if (err)
                return res.status(400).send({
                    success: false,
                    message: err
                });
                return res.status(200).send({
                    success: true,
                    data: result,
                    message: "Berhasil update data"
                });
            });
            connection.release();
        })
    },
    updateTransactionOut(req,res){
        let data = {
            outCategory : req.body.idCategory,
            outDescription : req.body.desc,
            outAmt : req.body.amt,
            outCreateAt : req.body.date
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE uang_cash_out SET ? WHERE outID = ?
                `
            , [data, req.body.id], function (err, result) {
                if (err)
                return res.status(400).send({
                    success: false,
                    message: err
                });
                return res.status(200).send({
                    success: true,
                    data: result,
                    message: "Berhasil update data"
                });
            });
            connection.release();
        })
    },
    deleteTransactionIn(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM uang_cash_in WHERE inID = ?
                `
            , [req.body.id], function (err, result) {
                if (err)
                return res.status(400).send({
                    success: false,
                    message: err
                });
                return res.status(200).send({
                    success: true,
                    data: result,
                    message: "Berhasil hapus data"
                });
            });
            connection.release();
        })
    },
    deleteTransactionOut(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM uang_cash_out WHERE outID = ?
                `
            ,[req.body.id], function (err, result) {
                if (err)
                return res.status(400).send({
                    success: false,
                    message: err
                });
                return res.status(200).send({
                    success: true,
                    data: result,
                    message: "Berhasil hapus data"
                });
            });
            connection.release();
        })
    },
    getMainReport(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                -- QUERY TOTAL IN
                SELECT SUM(inAmt) AS totalIn FROM uang_cash_in 
                    JOIN uang_users 
                ON userID = inUser 
                    JOIN uang_category 
                ON inCategory = categoryID
                WHERE categoryType = 0 
                    AND userID = ${req.decoded[0].userID};
                
                -- QUERY TOTAL OUT
                SELECT SUM(outAmt) AS totalOut FROM uang_cash_out 
                    JOIN uang_users 
                ON userID = outUser 
                    JOIN uang_category 
                ON outCategory = categoryID
                WHERE categoryType = 1 
                    AND userID = ${req.decoded[0].userID};
                
                -- QUERY TOP KATEGORY IN
                SELECT categoryID, categoryDescription, SUM(inAmt) AS total FROM uang_cash_in 
                    JOIN uang_users 
                ON userID = inUser 
                    JOIN uang_category 
                ON inCategory = categoryID
                WHERE categoryType = 0 
                    AND userID = ${req.decoded[0].userID}
                GROUP BY categoryDescription
                ORDER BY total DESC;

                -- QUERY TOP KATEGORY OUT
                SELECT categoryID, categoryDescription, SUM(outAmt) AS total FROM uang_cash_out 
                    JOIN uang_users 
                ON userID = outUser 
                    JOIN uang_category 
                ON outCategory = categoryID
                WHERE categoryType = 1 
                    AND userID = ${req.decoded[0].userID}
                GROUP BY categoryDescription
                ORDER BY total DESC;
                `
            , function (err, data) {
                if (err)
                return res.status(400).send({
                    success: false,
                    message: err
                });
                return res.status(200).send({
                    success: true,
                    data: data
                });
            });
            connection.release();
        })
    },
}