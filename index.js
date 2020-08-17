const express       = require('express');
const app           = express();

require('dotenv').config();
const { NODE_ENV, PORT_SERVER_DEV, PORT_SERVER_PRO } = process.env;

let PORT;
(NODE_ENV === 'production')?PORT = PORT_SERVER_PRO :PORT = PORT_SERVER_DEV

app.listen(PORT, ()=>{
    console.log(`Server listening in port : ${PORT}`);
});