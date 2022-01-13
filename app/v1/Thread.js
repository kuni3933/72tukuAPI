require("dotenv").config();

const express = require("express");
const router = express.Router();

const mysql = require("mysql2");
// https://github.com/sidorares/node-mysql2
const db_config = require("./../DB/DB_Config.js");
var pool = mysql.createPool(db_config.mysql_setting);

//---------------------------------
//var AdminToken = "true"; //|
//---------------------------------

//SELECT *
try {
  router.get("/:id", (req, res) => {
    const errors = [];
    const id = req.params.id;

    pool.getConnection(function (err, connection) {
      connection.execute(
        "SELECT comment_id,comment,comment_time FROM comment WHERE thread_id = ? ;",
        [id],
        (error, results) => {
          //console.log(results);
          connection.release();
          /*
          const json = JSON.stringify(results);
          console.log(json);
          decode = JSON.parse(json);
          console.log(decode);
          */
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
