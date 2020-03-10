
const mysql = require('mysql')
const {host,user,pwd,dbname} = require('./config');
const debug = require('../utils/constant').DEBUG;
function connect(){
    return mysql.createConnection({
        host,
        user,
        password:pwd,
        database:dbname,
        multipleStatements:true,
    })
}

function querySql(sql){
    const conn = connect();
    return new Promise((resolve,reject)=>{
        try{    
            conn.query(sql,(err,results)=>{
                if(err){
                    debug&&console.error(JSON.stringify(err));
                    reject(err);
                }else{
                    debug&&console.info(JSON.stringify(results));
                    resolve(results);
                }
            })
        }catch(err){
            reject(err);
        }finally{
            conn.end();
        }
    })
    
}

function queryOne(sql){
    return new Promise((resolve,reject)=>{
        querySql(sql).then(results=>{
            if(results&&results.length > 0){
                resolve(results[0])
            }else{
                resolve(null)
            }
        }).catch(err=>{
            reject(err)
        })
    })
} 

module.exports = {querySql,queryOne}