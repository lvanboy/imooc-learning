const expressJwt = require('express-jwt');
const { PRIVATE_KEY } = require('../utils/constant');
const jwtAuth = expressJwt({
    secret: PRIVATE_KEY,
    credentialsRequired: true
}).unless({
    path: [
        '/',
        '/user/login'
    ]  //jwt白名单
})


module.exports = jwtAuth