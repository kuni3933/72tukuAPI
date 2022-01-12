const mysql = require("mysql2");
const bcrypt = require("bcrypt");
require("dotenv").config();

var db_config = {
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};
var pool = mysql.createPool(db_config);

DB.SQL_Execution = function (sql) {
  pool.getConnection(function (err, connection) {
    connection.query(sql, (error, results) => {
      //console.log(res.json(results));
      res.json(results);
      connection.release();
    });
  });
};
