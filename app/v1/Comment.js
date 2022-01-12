const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();

const router = express.Router();
//---------------------------------
//var AdminToken = "true"; //|
//---------------------------------

//SELECT *
router.post("/", (req, res) => {
  const errors = [];
  res.json([{ Status: "1" }]);
});

router.delete("/", (req, res) => {
  const errors = [];
  res.json([{ Status: "1" }]);
});

//routerをモジュールとして扱う準備
module.exports = router;
