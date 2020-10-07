const express       = require('express');
const morgan        = require('morgan');
const helmet        = require('helmet');
const bodyParser    = require('body-parser');
const cors 			= require('cors');
const app           = express();

require('dotenv').config();
const { NODE_ENV, PORT_SERVER_DEV, PORT_SERVER_PRO } = process.env;

let PORT;
(NODE_ENV === 'production')?PORT = PORT_SERVER_PRO :PORT = PORT_SERVER_DEV

const mlRoutes       = require('./routes/router-ml');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet())
app.use(morgan('dev'));

app.get('/',(req,res)=>{
    res.send({'API Version': '1.0.0 Beta'});
});

app.use('/mobile-legends',mlRoutes);

app.listen(PORT, ()=>{
    console.log(`Server listening in port : ${PORT}`);
});