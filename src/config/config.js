const mysql = require('mysql');
const { database } = require('../util/util');

const connection = mysql.createConnection({
  host: database.host,
  user: database.user,
  password: database.password,
  database: database.database,
});

module.exports = async (sql, params) =>
  new Promise((resolve, reject) => {
    const handler = (err, result) => {
      if (err) {
        reject(err);
      }else{
          resolve(result)
      }
    };
    
    connection.query(sql,params, handler);

  }).catch(err =>{
      console.log(err)
  });
