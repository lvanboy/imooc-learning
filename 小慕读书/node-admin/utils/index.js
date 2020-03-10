const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {PRIVATE_KEY} = require('../utils/constant');
function md5(s) {
    return crypto.createHash('md5').update(String(s)).digest('hex');
}

function decode(req){
    const authorization = req.get('Authorization');
    console.log(authorization)
    let token = "";
    if(authorization.indexOf('Bearer') >= 0){
        token = authorization.replace('Bearer ','');
    }else{
        token = authorization;
    }
    console.log(token);
    return jwt.verify(token,PRIVATE_KEY);
}
module.exports = { md5,decode }