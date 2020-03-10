const express = require('express')
const boom = require('boom');
const { CODE_ERROR } = require('../utils/constant.js');
const router = express.Router();
const userRouter = require('./user.js');
const jwtAuth = require('./jwt');
const Result = require('../models/Result')

//对所有路由进行jwt认真
router.use(jwtAuth);

router.get('/', (req, res) => {
    res.send('learning  node http express');
})

// 通过 userRouter 来处理 /user 路由，对路由处理进行解耦
router.use('/user', userRouter);

router.use((req, res, next) => {
    next(boom.notFound('接口不存在'))
})

router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        new Rusult(null, 'token', {
            error: err.status,
            errorMsg: err.name
        }).expired(res.status(err.status))
    } else {
        const msg = (err && err.message) || '系统错误';
        const statusCode = (err.output && err.output.statusCode) || 500;
        const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message;
        new Result(null, msg, {
            error: statusCode,
            errorMsg
        }).fail(res.status(statusCode))
    }

})

module.exports = router;