const express = require("express");
const bcrypt = require("bcrypt");
const { json } = require("express/lib/response");
require("dotenv").config();

const router = express.Router();
//---------------------------------
//var AdminToken = "true"; //|
//---------------------------------

//SELECT *
router.get("/", (req, res) => {
  const errors = [];
  const json = JSON.parse(
    '[{ "Category_Id": "tmp_1", "Category_Name": "tmp_1" }]'
  );
  // res.json([{ Category_Id: "tmp_1", Category_Name: "tmp_1" }]);
  res.json(json);
});

//routerをモジュールとして扱う準備
module.exports = router;
