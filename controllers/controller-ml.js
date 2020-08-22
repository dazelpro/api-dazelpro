const config    = require('../config/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    getHero(req,res){
        let hero = [];
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `SELECT * FROM table_hero_ml`
            , function (error, results) {
                if (error) {
                    console.error(error);
                    return res.status(400).send({
                        success: false,
                        status: 400,
                        message: error
                    });	
                }
                
                results.forEach(async function(heroloop) {
                    let data = {
                        hero_id : heroloop['hero_id'],
                        hero_name : heroloop['hero_name'],
                        hero_avatar : heroloop['hero_avatar'],
                        hero_role : heroloop['hero_role'],
                        hero_specially : heroloop['hero_specially'],
                        hero_overview : {
                            hero_durability : heroloop['hero_durability'],
                            hero_offence : heroloop['hero_offence'],
                            hero_ability : heroloop['hero_ability'],
                            hero_difficulty : heroloop['hero_difficulty'],
                        }
                    }
                    hero.push(data)
                })
                
                res.status(200).send({
                    success: true,
                    status: 200,
                    rowCount: results.length,
                    message: "Successful",
                    hero: hero
                });
            });
            connection.release();
        })
	},
}