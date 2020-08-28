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
    getHero(req,res){
        let hero = [];
        let keyword = req.query['heroName'];
        if(req.query['heroName'] === undefined){
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
                            hero_avatar : `${urlImage}files/images/${heroloop['hero_avatar']}`,
                            hero_role : heroloop['hero_role'],
                            hero_specially : heroloop['hero_specially']
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
        }else{
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM table_hero_ml WHERE hero_name LIKE '%${keyword}%'`
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
                            hero_avatar : `${urlImage}files/images/${heroloop['hero_avatar']}`,
                            hero_role : heroloop['hero_role'],
                            hero_specially : heroloop['hero_specially']
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
        }
    },
    getHeroById(req,res){
        let hero = [];
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `SELECT * FROM table_hero_ml WHERE hero_id = ${req.params["id"]}`
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
                        hero_avatar : `${urlImage}files/images/${heroloop['hero_avatar']}`,
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
    getHeroRole(req,res){
        let hero = [];
        let keyword = req.query['roleName'];
        if(req.query['roleName'] === undefined){
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM table_role_hero_ml`
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
                        rowCount: results.length,
                        message: "Successful",
                        role: results
                    });
                });
                connection.release();
            })
        }else{
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM table_hero_ml WHERE hero_role LIKE '%${keyword}%'`
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
                            hero_avatar : `${urlImage}files/images/${heroloop['hero_avatar']}`,
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
        }
    },
    getHeroSpecially(req,res){
        let hero = [];
        let keyword = req.query['speciallyName'];
        if(req.query['speciallyName'] === undefined){
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM table_specially_hero_ml`
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
                        rowCount: results.length,
                        message: "Successful",
                        specially: results
                    });
                });
                connection.release();
            })
        }else{
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM table_hero_ml WHERE hero_specially LIKE '%${keyword}%'`
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
                            hero_avatar : `${urlImage}files/images/${heroloop['hero_avatar']}`,
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
        }
	},
}