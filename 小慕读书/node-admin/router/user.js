const express = require('express')
const router = express.Router();

router.get('/info',function(req,res,next){
    console.log('req',req);
    res.json('user info');
})

router.post('/login',(req,res,next)=>{
    res.json({
        code:'0',
        msg:{taken:'12580'},
        error:'200',
        errorMsg:'请求正常'
    })
})

module.exports = router;