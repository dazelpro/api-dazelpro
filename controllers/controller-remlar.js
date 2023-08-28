const config    = require('../config/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

require('dotenv').config();
const { 
    NODE_ENV, 
    URL_IMG_DEV, 
    URL_IMG_PRO,
} = process.env;
  
let urlImage;
  
if (NODE_ENV === 'production') {
    urlImage = URL_IMG_PRO
} else {
    urlImage = URL_IMG_DEV
}

module.exports ={
    check(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM table_testing WHERE id = 1;
                `
            , function (error, results) {
                if (error) {
                    console.error(error);
                    return res.status(400).send({
                        success: false,
                        status: 400,
                        message: error
                    });	
                }                
                res.status(200).send({
                    success: true,
                    status: 200,
                    message: "Success",
                    data: results[0]
                });
            });
            connection.release();
        })
	},
    switch(req,res){
        console.log(req.params.id)
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE table_testing SET status = '${req.params.id}' WHERE id = 1
                `
            , function (error, results) {
                if (error) {
                    console.error(error);
                    return res.status(400).send({
                        success: false,
                        status: 400,
                        message: error
                    });	
                }                
                res.status(200).send({
                    success: true,
                    status: 200,
                    message: "Success"
                });
            });
            connection.release();
        })
	},
}