require("dotenv").config();

const express = require("express");
const router = express.Router();

require("date-utils");

const mysql = require("mysql2");
// https://github.com/sidorares/node-mysql2
const db_config = require("./../DB/DB_Config.js");
var pool = mysql.createPool(db_config.mysql_setting);

//---------------------------------
//var AdminToken = "true"; //|
//---------------------------------
try {
  //SELECT Id
  router.get("/Id/:id", (req, res) => {
    const id = req.params.id;
    const errors = [];

    pool.getConnection(function (err, connection) {
      connection.execute(
        "SELECT thread_id,thread_Name FROM thread_list WHERE thread_id = ?;",
        [id],
        (error, results) => {
          //console.log(results);
          connection.release();
          res.status(200).json(JSON.stringify(results));
        }
      );
    });
  });

  //SELECT Name
  router.get("/Name/:name", (req, res) => {
    const name = req.params.name;
    const errors = [];

    pool.getConnection(function (err, connection) {
      connection.execute(
        //todo
        "SELECT thread_id,thread_name FROM thread_list WHERE thread_name LIKE ?",
        "%" + name + "%",
        (error, results) => {
          console.log(results);
          connection.release();
          res.status(200).json(JSON.stringify(results));
        }
      );
    });
  });

  //SELECT Category
  router.get("/Category/:category", (req, res) => {
    const category = req.params.category;
    const errors = [];

    pool.getConnection(function (err, connection) {
      connection.execute(
        "SELECT thread_id,thread_Name FROM thread_list WHERE category_id = ?;",
        [category],
        (error, results) => {
          //console.log(results);
          connection.release();
          res.status(200).json(JSON.stringify(results));
        }
      );
    });
  });
} catch (err) {
  throw new Error(err);
}

//routerをモジュールとして扱う準備
module.exports = router;
