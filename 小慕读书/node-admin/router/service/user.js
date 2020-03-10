const { querySql,queryOne } = require('../../db/index');

function login(username, pwd) {
    let sql = `select * from admin_user where username = '${username}' and password = '${pwd}'`;
    return querySql(sql);
}

function findUser(username){
    let sql = `select * from admin_user where username = '${username}'`;
    return queryOne(sql);
}

module.exports = {login,findUser}