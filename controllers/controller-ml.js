const config    = require('../config/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    getHero(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `SELECT* FROM table_hero_ml`
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
                    message: "Successful",
                    hero: results
                });
            });
            connection.release();
        })
	},
}