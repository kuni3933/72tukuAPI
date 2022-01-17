require("dotenv").config();

const e = require("express");
const express = require("express");
const router = express.Router();
const { param, body, validationResult } = require("express-validator");

const mysql = require("mysql2");
// https://github.com/sidorares/node-mysql2
const db_config = require("./../DB/DB_Config.js");
var pool = mysql.createPool(db_config.mysql_setting);

//---------------------------------
//var AdminToken = "true"; //|
//---------------------------------

//SELECT *
try {
  router.get(
    "/:id",
    // id must be an integer
    param("id").isInt({ min: 1 }).escape(),
    (req, res) => {
      const Errors = validationResult(req);
      if (!Errors.isEmpty()) {
        //If there is an Error...//
        //console.log(Errors); //todo CommentOut
        //console.log(Errors.array()); //todo CommentOut
        //console.log(JSON.stringify(Errors, null, 2)); //todo CommentOut
        //console.log(JSON.stringify(Errors.array(), null, 2)); //todo CommentOut
        const Response = { status: 0, Errors: Errors };
        //console.log(Response); //todo CommentOut
        return res.status(404).json(JSON.stringify(Response));
      }
      const id = req.params.id;

      pool.getConnection(function (err, connection) {
        connection.execute(
          "SELECT comment_id,comment,comment_time FROM comment WHERE thread_id = ?;",
          [id],
          (error, results) => {
            connection.release();
            //console.log(results); //todo CommentOut
            //console.log(JSON.stringify(results, null, 2)); //todo CommentOut
            //console.log(JSON.parse(JSON.stringify(results))); //todo CommentOut
            if (results && results.length > 0) {
              const obj = { status: 1, data: results };
              res.status(200).json(JSON.stringify(obj));
            } else if (results && results.length == 0) {
              res.status(404).json(JSON.stringify({ status: 0 }));
            } else if (error) {
              res.status(404).json(JSON.stringify({ status: 0 }));
            }
          }
        );
      });
    }
  );

  router.post(
    "/",
    // id must be an integer
    body("category_id").isInt({ min: 1 }).escape(),
    body("thread_name").isLength({ min: 1, max: 32 }).escape(),
    (req, res) => {
      const Errors = validationResult(req);
      if (!Errors.isEmpty()) {
        //If there is an Error...//
        //console.log(Errors); //todo CommentOut
        //console.log(Errors.array()); //todo CommentOut
        //console.log(JSON.stringify(Errors, null, 2)); //todo CommentOut
        //console.log(JSON.stringify(Errors.array(), null, 2)); //todo CommentOut
        const Response = { status: 0, Errors: Errors };
        //console.log(Response); //todo CommentOut
        return res.status(404).json(JSON.stringify(Response));
      }
      const category_id = req.body.category_id;
      const thread_name = req.body.thread_name;

      const dt = new Date();
      const thread_time = dt.toFormat("YYYY-MM-DD HH24:MI:SS");

      pool.getConnection(function (err, connection) {
        connection.execute(
          "INSERT INTO thread_list(thread_id,category_id,thread_name,thread_time,closed_flag) VALUES(0,?,?,?,0);",
          [category_id, thread_name, thread_time],
          (error, results) => {
            connection.release();
            //console.log(results); //todo CommentOut
            //console.log(JSON.stringify(results, null, 2)); //todo CommentOut
            //console.log(JSON.parse(JSON.stringify(results))); //todo CommentOut
            if (results && results.affectedRows >= 1) {
              res.status(200).json(JSON.stringify({ status: 1 }));
            } else if (results && results.affectedRows == 0) {
              res.status(200).json(JSON.stringify({ status: 0 }));
            } else if (error) {
              res.status(200).json(JSON.stringify({ status: 0 }));
            }
          }
        );
      });
    }
  );

  router.delete(
    "/",
    // id must be an integer
    body("thread_id").isInt({ min: 1 }).escape(),
    (req, res) => {
      const Errors = validationResult(req);
      if (!Errors.isEmpty()) {
        //If there is an Error...//
        //console.log(Errors); //todo CommentOut
        //console.log(Errors.array()); //todo CommentOut
        //console.log(JSON.stringify(Errors, null, 2)); //todo CommentOut
        //console.log(JSON.stringify(Errors.array(), null, 2)); //todo CommentOut
        const Response = { status: 0, Errors: Errors };
        //console.log(Response); //todo CommentOut
        return res.status(404).json(JSON.stringify(Response));
      }
      const thread_id = req.body.thread_id;

      pool.getConnection(function (err, connection) {
        connection.execute(
          "DELETE FROM Thread_list WHERE thread_id = ?;",
          [thread_id],
          (error, results) => {
            connection.release();
            //console.log(results); //todo CommentOut
            //console.log(JSON.stringify(results, null, 2)); //todo CommentOut
            //console.log(JSON.parse(JSON.stringify(results))); //todo CommentOut
            if (results && results.affectedRows >= 1) {
              res.status(200).json(JSON.stringify({ status: 1 }));
            } else if (results && results.affectedRows == 0) {
              res.status(200).json(JSON.stringify({ status: 0 }));
            } else if (error) {
              res.status(200).json(JSON.stringify({ status: 0 }));
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
