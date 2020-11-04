const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../config/database");

let mysql = require("mysql");
let pool = mysql.createPool(config);

pool.on("error",(err)=> {
    console.error(err);
});

require("dotenv").config();
const { JWTSECRET } = process.env;

const strategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWTSECRET
};
passport.use(
    new JwtStrategy(strategyOptions, (jwt_payload, done) => {
        const id = jwt_payload.user;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM uang_users WHERE userID = ?', [id], function (error, user) {
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
            connection.release();
        })
    })
);