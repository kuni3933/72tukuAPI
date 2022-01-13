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
  //POST
  router.post("/", (req, res) => {
    const errors = [];
    const thread_id = req.body.thread_id;
    const comment = req.body.comment;
    const API_Token = req.body.API_Token;

    const dt = new Date();
    const comment_time = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
    //console.log(comment_time);

    pool.getConnection(function (err, connection) {
      connection.execute(
        "INSERT INTO comment(comment_id,thread_id,comment,comment_time) VALUES(?,?,?,?);",
        [null, thread_id, comment, comment_time],
        (error, results) => {
          //console.log(results);
          connection.release();

          if (results.affectedRows == 0) {
            res.status(200).json(
              JSON.stringify({
                Status: 0,
              })
            );
          } else if (results.affectedRows <= 1) {
            res.status(200).json(
              JSON.stringify({
                Status: 1,
              })
            );
          }
          /*
          else if (results.affectedRows == 1 && results.insertId == 500) {
            const response = JSON.stringify({
              Status: 2,
              rows: results.insertId,
            });
            res.status(200).json(response);
            //res.json(response);
          }
          */
        }
      );
    });
  });

  //DELETE
  router.delete("/", (req, res) => {
    const errors = [];
    const thread_id = req.body.thread_id;
    const comment_id = req.body.comment_id;
    const API_Token = req.body.API_Token;

    const dt = new Date();
    const comment_time = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
    //console.log(comment_time);

    pool.getConnection(function (err, connection) {
      connection.execute(
        "DELETE FROM comment WHERE thread_id = ? AND comment_id = ?;",
        [thread_id, comment_id],
        (error, results) => {
          //console.log(results);
          connection.release();

          if (results.affectedRows == 0) {
            res.status(200).json(
              JSON.stringify({
                Status: 0,
              })
            );
          } else if (results.affectedRows <= 1) {
            res.status(200).json(
              JSON.stringify({
                Status: 1,
              })
            );
          }
        }
      );
    });
  });
} catch (err) {
  throw new Error(err);
}

//routerをモジュールとして扱う準備
module.exports = router;
