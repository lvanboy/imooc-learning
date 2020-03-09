const express = require('express')
const router = express.Router();
const Result = require('../models/Result');
const {login} = require('./service/user');
const {md5} = require('../utils/index');
const {PWD_SALT} = require('../utils/constant');
router.get('/info',function(req,res,next){
    res.json('user info');
})

router.post('/login',(req,res,next)=>{
    let {username,password} = req.body;
    password = md5(`${password}${PWD_SALT}`);
    login(username,password).then(user=>{
        if(!user || user.length === 0){
            new Result('登录失败').fail(res);
           
        }else{
            new Result('登录成功').success(res);
        }
    },err=>{
        new Result('登录失败').fail(res);
    })
   
})

module.exports = router;