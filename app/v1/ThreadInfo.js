require("dotenv").config();

const express = require("express");
const router = express.Router();
const { param, validationResult } = require("express-validator");

require("date-utils");

const mysql = require("mysql2");
// https://github.com/sidorares/node-mysql2
const db_config = require("./../DB/DB_Config.js");
var pool = mysql.createPool(db_config.mysql_setting);

//---------------------------------
//var AdminToken = "true"; //|
//---------------------------------
try {
  //SELECT *
  router.get("/", (req, res) => {
    pool.getConnection(function (err, connection) {
      connection.execute(
        "SELECT thread_id,thread_name,category_id FROM thread_list WHERE closed_flag = false;",
        (error, results) => {
          connection.release();
          //console.log(results); //todo CommentOut
          //console.log(JSON.stringify(results, null, 2)); //todo CommentOut
          //console.log(JSON.parse(JSON.stringify(results))); //todo CommentOut
          if (results && results.length >= 0) {
            const obj = { status: 1, count: results.length, data: results };
            res.status(200).json(JSON.stringify(obj));
          } else if (error) {
            res.status(404).json(JSON.stringify({ status: 0 }));
          } else {
            res.status(404).json(JSON.stringify({ status: 0 }));
          }
        }
      );
    });
  });

  //SELECT Id
  router.get(
    "/Id/:id",
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
          "SELECT thread_id,thread_name,category_id FROM thread_list WHERE closed_flag = false AND  thread_id = ?;",
          [id],
          (error, results) => {
            connection.release();
            console.log(results); //todo CommentOut
            //console.log(JSON.stringify(results, null, 2)); //todo CommentOut
            //console.log(JSON.parse(JSON.stringify(results))); //todo CommentOut
            if (results && results.length == 1) {
              const obj = { status: 1, count: 1, data: results };
              res.status(200).json(JSON.stringify(obj));
            } else if (results.length == 0) {
              res.status(200).json(JSON.stringify({ status: 0, count: 0 }));
            } else if (error) {
              res.status(404).json(JSON.stringify({ status: 0 }));
            } else {
              res.status(404).json(JSON.stringify({ status: 0 }));
            }
          }
        );
      });
    }
  );

  //SELECT Name
  router.get(
    "/Name/:name",
    // name must be an integer
    param("name").isLength({ min: 1, max: 32 }).escape(),
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
      const name = req.params.name;

      pool.getConnection(function (err, connection) {
        connection.execute(
          //todo
          "SELECT thread_id,thread_name,category_id FROM thread_list WHERE closed_flag = false AND thread_name LIKE ?;",
          ["%" + name + "%"],
          (error, results) => {
            connection.release();
            //console.log(results); //todo CommentOut
            //console.log(JSON.stringify(results, null, 2)); //todo CommentOut
            //console.log(JSON.parse(JSON.stringify(results))); //todo CommentOut
            if (results && results.length >= 0) {
              const obj = { status: 1, count: results.length, data: results };
              res.status(200).json(JSON.stringify(obj));
            } else if (error) {
              res.status(404).json(JSON.stringify({ status: 0 }));
            } else {
              res.status(404).json(JSON.stringify({ status: 0 }));
            }
          }
        );
      });
    }
  );

  //SELECT Category
  router.get(
    "/Category/:category",
    // category must be an integer
    param("category").isInt({ min: 1 }).escape(),
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
      const category_id = req.params.category;

      pool.getConnection(function (err, connection) {
        connection.execute(
          "SELECT thread_id,thread_name,category_id FROM thread_list WHERE closed_flag = false AND category_id = ?;",
          [category_id],
          (error, results) => {
            connection.release();
            //console.log(results); //todo CommentOut
            //console.log(JSON.stringify(results, null, 2)); //todo CommentOut
            //console.log(JSON.parse(JSON.stringify(results))); //todo CommentOut
            if (results && results.length >= 0) {
              const obj = { status: 1, count: results.length, data: results };
              res.status(200).json(JSON.stringify(obj));
            } else if (error) {
              res.status(404).json(JSON.stringify({ status: 0 }));
            } else {
              res.status(404).json(JSON.stringify({ status: 0 }));
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
