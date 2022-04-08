const mysql = require('mysql2')

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'hackathon'
});

const query = async (query, params, transaction) => {
    try{
        const result = await transaction.query(query, params);
        return result[0];
    }catch(err){
        console.log('err', err);
        throw err;
    }
}

module.exports = {
    mysqlPool: mysqlPool.promise(), 
    query
}