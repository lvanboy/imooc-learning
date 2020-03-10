const express = require('express')
const { body, validationResult } = require('express-validator');
const boom = require('boom');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Result = require('../models/Result');
const { login,findUser } = require('./service/user');
const { md5,decode } = require('../utils/index');
const { PWD_SALT, PRIVATE_KEY, EXPIRED_TIME } = require('../utils/constant');


router.get('/info', function (req, res, next) {
    const decoded = decode(req);
    if(decoded&&decoded.username){
        findUser(decoded.username).then(user=>{
            if(user){
                user.roles =[user.role];
                new Result(user,'获取用户信息成功').success(res);
            }else{
                new Result('用户信息解析失败').fail(res);
            }
        })
    }
})

router.post('/login',
    [
        body('username').isString().withMessage('username类型不正确'),
        body('password').isString().withMessage('password类型不正确')
    ]
    , (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            [{ msg }] = err.errors;
            next(boom.badRequest(msg));
        }
        let { username, password } = req.body;
        password = md5(`${password}${PWD_SALT}`);
        login(username, password).then(user => {
            if (!user || user.length === 0) {
                new Result('登录失败').fail(res);

            } else {
                const token = jwt.sign({
                    username
                }, PRIVATE_KEY, { expiresIn: EXPIRED_TIME })
                new Result({ token }, '登录成功').success(res);
            }
        }, err => {
            new Result('登录失败').fail(res);
        })

    })

module.exports = router;