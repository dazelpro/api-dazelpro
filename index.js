const express       = require('express');
const morgan        = require('morgan');
const helmet        = require('helmet');
const bodyParser    = require('body-parser');
const useragent     = require("express-useragent");
const cors 			= require('cors');
require("./config/passport");
const passport      = require("passport");
const passportLogin = passport.authenticate("jwt", { session: false });

const app           = express();

require('dotenv').config();
const { NODE_ENV, PORT_SERVER_DEV, PORT_SERVER_PRO } = process.env;

let PORT;
(NODE_ENV === 'production')?PORT = PORT_SERVER_PRO :PORT = PORT_SERVER_DEV

const mlRoutes       = require('./routes/router-ml');
const uangkuRoutes       = require('./routes/router-uangku-login');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(useragent.express());

app.use(helmet())
app.use(morgan('dev'));

app.get('/',(req,res)=>{
    res.send({'API Version': '2.0.0 Beta'});
});

app.use('/mobile-legends',mlRoutes);
app.use('/uangku-login',uangkuRoutes);

app.use(passportLogin,(req, res, next)=>{
    let origin = req.headers.origin;
    let allowedOrigins = ["https://uang.dazelpro.com","http://localhost:4200"]; 
    if (allowedOrigins.indexOf(origin) < 0) {
        res.setHeader("Access-Control-Allow-Origin", allowedOrigins);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With", "Content-Type", "Authorization", "Accept");
    req.decoded = req.user;
    next();
});

app.use('/uangku-tes',uangkuRoutes);

app.listen(PORT, ()=>{
    console.log(`Server listening in port : ${PORT}`);
});