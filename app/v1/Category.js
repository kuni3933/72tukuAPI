require("dotenv").config();

const express = require("express");
const router = express.Router();
const { param, validationResult } = require("express-validator");

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
          if (results && results.length > 0) {
            const obj = [];
            obj.push({ status: "1", data: results });
            //console.log(obj);
            console.log(JSON.stringify(obj, null, 2));
            console.log(JSON.parse(JSON.stringify(obj)));
            res.status(200).json(JSON.stringify(obj));
          } else if (results && results.length == 0) {
            res.status(404).json(JSON.stringify({ Status: 0 }));
          } else if (error) {
            res.status(404).json(JSON.stringify({ Status: 0 }));
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
        const Response = { Status: 0 };
        Response.Errors = Errors.array();
        //console.log(Response); //todo CommentOut
        return res.status(404).json(JSON.stringify(Response));
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
              res.status(200).json(JSON.stringify(results));
            } else if (results.length == 0) {
              res.status(404).json(JSON.stringify({ Status: 0 }));
            } else if (error) {
              res.status(404).json(JSON.stringify({ Status: 0 }));
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
