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

// API Public
const mlRoutes = require('./routes/router-ml');
const remlarRoutes = require('./routes/router-remlar');

// Uangku
const uangkuLoginRoutes = require('./routes/router-uangku-login');
const uangkuAccountRoutes = require('./routes/router-uangku-account');
const uangkuCategoryRoutes = require('./routes/router-uangku-category');
const uangkuTransactionRoutes = require('./routes/router-uangku-transaction');
const uangkuReportRoutes = require('./routes/router-uangku-report');

// My Task
const taskLoginRoutes = require('./routes/router-task-login');

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
app.use('/remlar',remlarRoutes);
app.use('/uangku-login',uangkuLoginRoutes);
app.use('/task-login',taskLoginRoutes);

app.use(passportLogin,(req, res, next)=>{
    let origin = req.headers.origin;
    let allowedOrigins = [
                            "http://localhost:4200",
                            "https://uangku.dazelpro.com",
                            "https://dazelpro-dev.netlify.app",
                            "https://dazelpro.site",
                            "https://task.dazelpro.site",
                            "https://note.dazelpro.site"
                        ]; 
    if (allowedOrigins.indexOf(origin) < 0) {
        res.setHeader("Access-Control-Allow-Origin", allowedOrigins);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With", "Content-Type", "Authorization", "Accept");
    req.decoded = req.user;
    next();
});

// Uangku Protec
app.use('/uangku-account',uangkuAccountRoutes);
app.use('/uangku-category',uangkuCategoryRoutes);
app.use('/uangku-transaction',uangkuTransactionRoutes);
app.use('/uangku-report',uangkuReportRoutes);

// Task Protec
app.use('/task-account',uangkuAccountRoutes);

app.listen(PORT, ()=>{
    console.log(`Server listening in port : ${PORT}`);
});