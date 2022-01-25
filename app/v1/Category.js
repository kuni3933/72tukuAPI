require("dotenv").config();

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
try {
  //SELECT *
  router.get("/", (req, res) => {
    pool.getConnection(function (err, connection) {
      connection.execute(
        "SELECT category_id,category_name FROM category;",
        (error, results) => {
          connection.release();

          //console.log(results);
          //console.log(JSON.stringify(results, null, 2));
          //console.log(JSON.parse(JSON.stringify(results)));
          if (results.length >= 0) {
            const obj = JSON.stringify(
              {
                status: 1,
                count: results.length,
                data: results,
              },
              null,
              4
            );
            //console.log(obj);
            //console.log(JSON.stringify(obj, null, 2));
            //console.log(JSON.parse(JSON.stringify(obj)));
            res.header("Content-Type", "application/json");
            res.status(200).send(obj);
          } else if (error) {
            console.log(error);
            res.status(404).json({ status: 0 });
          } else {
            res.status(404).json({ status: 0 });
          }
        }
      );
    });
  });

  //SELECT WHERE ID
  router.get(
    "/Id/:category_id",
    // id must be an integer
    param("category_id").isInt({ min: 1 }).escape(),
    (req, res) => {
      const Errors = validationResult(req);
      if (!Errors.isEmpty()) {
        //If there is an Error...//
        //console.log(Errors); //todo CommentOut
        //console.log(Errors.array()); //todo CommentOut
        //console.log(JSON.stringify(Errors, null, 2)); //todo CommentOut
        //console.log(JSON.stringify(Errors.array(), null, 2)); //todo CommentOut
        const Response = JSON.stringify(
          { status: 0, Errors: Errors["errors"] },
          null,
          4
        );
        //console.log(Response); //todo CommentOut
        res.header("Content-Type", "application/json");
        return res.status(404).send(Response);
      }
      const category_id = req.params.category_id;

      pool.getConnection(function (err, connection) {
        connection.execute(
          "SELECT category_id,category_name FROM category WHERE category_id = ?;",
          [category_id],
          (error, results) => {
            connection.release();
            //console.log(results); //todo CommentOut
            //console.log(JSON.stringify(results, null, 2)); //todo CommentOut
            //console.log(JSON.parse(JSON.stringify(results))); //todo CommentOut
            if (results.length == 1) {
              const obj = JSON.stringify(
                { status: 1, count: results.length, data: results },
                null,
                4
              );
              res.header("Content-Type", "application/json");
              res.status(200).send(obj);
            } else if (results.length == 0) {
              res.status(404).json({ status: 0, count: 0 });
            } else if (error) {
              res.status(404).json({ status: 0 });
            } else {
              res.status(404).json({ status: 0 });
            }
          }
        );
      });
    }
  );

  //POST
  router.post(
    "/",
    // thread_id must be an integer
    // comment must be a string.
    body("category_name").isLength({ min: 1, max: 16 }).escape(),
    (req, res) => {
      const Errors = validationResult(req);
      if (!Errors.isEmpty()) {
        //If there is an Error...//
        //console.log(Errors); //todo CommentOut
        //console.log(Errors.array()); //todo CommentOut
        //console.log(JSON.stringify(Errors, null, 2)); //todo CommentOut
        //console.log(JSON.stringify(Errors.array(), null, 2)); //todo CommentOut
        const Response = JSON.stringify(
          { status: 0, Errors: Errors["errors"] },
          null,
          4
        );
        //console.log(Response); //todo CommentOut
        res.header("Content-Type", "application/json");
        return res.status(404).send(Response);
      }
      const category_name = req.body.category_name;
      const API_Token = req.body.API_Token;

      pool.getConnection(function (err, connection) {
        connection.execute(
          "INSERT INTO category(category_id,category_name) VALUES(null,?);",
          [category_name],
          (error, results) => {
            connection.release();
            if (results && results.affectedRows >= 1) {
              const obj = JSON.stringify(
                {
                  status: 1,
                  category_id: results.insertId,
                  category_name: category_name,
                },
                null,
                4
              );
              res.header("Content-Type", "application/json");
              res.status(200).send(obj);
            } else if (results && results.affectedRows == 0) {
              res.status(404).json({ status: 0 });
            } else if (error) {
              console.log(error);
              res.status(404).json({ status: 0 });
            } else {
              res.status(404).json({ status: 0 });
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
