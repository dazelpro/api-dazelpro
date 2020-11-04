const express       = require('express');
const morgan        = require('morgan');
const helmet        = require('helmet');
const bodyParser    = require('body-parser');
const useragent     = require("express-useragent");
const cors 			= require('cors');
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

app.listen(PORT, ()=>{
    console.log(`Server listening in port : ${PORT}`);
});