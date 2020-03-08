const express = require('express')
const boom =  require('boom');
const {CODE_ERROR} = require('../utils/constant.js');
const router = express.Router();
const userRouter = require('./user.js');

router.get('/',(req,res)=>{
    res.send('learning  node http express');
})

// 通过 userRouter 来处理 /user 路由，对路由处理进行解耦
router.use('/user',userRouter);



router.use((req,res,next)=>{
    next(boom.notFound('接口不存在'))
})

router.use((err,req,res,next)=>{
    const msg = (err && err.message) || '系统错误';
    const statusCode = (err.output && err.output.statusCode) || 500;
    const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message;
    res.status(statusCode).json({
        code:CODE_ERROR,
        msg,
        error:statusCode,
        errorMsg
    })
})

module.exports = router;