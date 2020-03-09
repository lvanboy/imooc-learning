const { querySql } = require('../../db/index');

function login(username, pwd) {
    let sql = `select * from admin_user where username = '${username}' and password = '${pwd}'`;
    return querySql(sql);
}


module.exports = {login}