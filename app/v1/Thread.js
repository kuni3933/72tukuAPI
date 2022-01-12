const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();

const router = express.Router();
//---------------------------------
//var AdminToken = "true"; //|
//---------------------------------

//SELECT *
router.get("/:id", (req, res) => {
  const errors = [];
  res.json([
    {
      Comment_Id: "tmp_1",
      Comment: "tmp_1",
      Comment_Time: "tmp_1",
      Comment_User: "tmp_1",
    },
    {
      Comment_Id: "tmp_2",
      Comment: "tmp_2",
      Comment_Time: "tmp_2",
      Comment_User: "tmp_2",
    },
  ]);
});

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
