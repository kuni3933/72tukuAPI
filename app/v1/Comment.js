require("dotenv").config();

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

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
  router.post(
    "/",
    // thread_id must be an integer
    body("thread_id").isInt({ min: 1 }).escape(),
    // comment must be a string.
    body("comment").isLength({ min: 1, max: 255 }).escape(),
    (req, res) => {
      const Errors = validationResult(req);
      if (!Errors.isEmpty()) {
        //If there is an Error...//
        //console.log(Errors); //todo CommentOut
        //console.log(Errors.array()); //todo CommentOut
        //console.log(JSON.stringify(Errors, null, 2)); //todo CommentOut
        //console.log(JSON.stringify(Errors.array(), null, 2)); //todo CommentOut
        const Response = { Status: 0 };
        Response.Errors = Errors.array();
        //console.log(Response); //todo CommentOut
        return res.status(404).json(JSON.stringify(Response));
      }
      const thread_id = req.body.thread_id;
      const comment = req.body.comment;
      const API_Token = req.body.API_Token;

      const dt = new Date();
      const comment_time = dt.toFormat("YYYY-MM-DD HH24:MI:SS");

      pool.getConnection(function (err, connection) {
        connection.execute(
          "INSERT INTO comment(comment_id,thread_id,comment,comment_time) VALUES(?,?,?,?);",
          [null, thread_id, comment, comment_time],
          (error, results) => {
            //console.log(results); //todo CommentOut
            connection.release();
            if (results && results.affectedRows >= 1) {
              res.status(200).json(JSON.stringify({ Status: 1 }));
            } else if (results && results.affectedRows == 0) {
              res.status(200).json(JSON.stringify({ Status: 0 }));
            } else if (error) {
              res.status(200).json(JSON.stringify({ Status: 0 }));
            }
          }
        );
      });
    }
  );

  //DELETE
  router.delete(
    "/", // Thread_id must be an integer
    body("thread_id").isInt({ min: 1 }).escape(),
    // Comment must be a string.
    body("comment_id").isInt({ min: 1 }).escape(),
    (req, res) => {
      const Errors = validationResult(req);
      if (!Errors.isEmpty()) {
        //If there is an Error...//
        //console.log(Errors);
        //console.log(Errors.array());
        //console.log(JSON.stringify(Errors, null, 2));
        //console.log(JSON.stringify(Errors.array(), null, 2));
        const Response = { Status: 0 };
        Response.Errors = Errors.array();
        //console.log(Response); //todo CommentOut
        return res.status(404).json(JSON.stringify(Response));
      }
      const thread_id = req.body.thread_id;
      const comment_id = req.body.comment_id;
      const API_Token = req.body.API_Token;

      pool.getConnection(function (err, connection) {
        connection.execute(
          "DELETE FROM comment WHERE thread_id = ? AND comment_id = ?;",
          [thread_id, comment_id],
          (error, results) => {
            //console.log(results); //todo CommentOut
            connection.release();

            if (results && results.affectedRows >= 1) {
              res.status(200).json(JSON.stringify({ Status: 1 }));
            }
            if (results && results.affectedRows <= 0) {
              res.status(200).json(JSON.stringify({ Status: 0 }));
            } else if (error) {
              res.status(200).json(JSON.stringify({ Status: 0 }));
            }
          }
        );
      });
    }
  );
} catch (err) {
  throw new Error(err);
}

//routerをモジュールとして扱う準備
module.exports = router;