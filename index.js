const express       = require('express');
const morgan        = require('morgan');
const helmet        = require('helmet');
const bodyParser    = require('body-parser');
const app           = express();

require('dotenv').config();
const { NODE_ENV, PORT_SERVER_DEV, PORT_SERVER_PRO } = process.env;

let PORT;
(NODE_ENV === 'production')?PORT = PORT_SERVER_PRO :PORT = PORT_SERVER_DEV

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet())
app.use(morgan('dev'));

app.listen(PORT, ()=>{
    console.log(`Server listening in port : ${PORT}`);
});