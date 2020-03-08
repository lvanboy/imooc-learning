const express = require('express');
const app = express();
const router = require('./router');
app.use('/',router);


const server = app.listen(7777,()=>{
    const {address,port} = server.address();
    console.log("Http Server is running on  http://%s:%s",address,port);
})




