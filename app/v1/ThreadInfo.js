const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();

const router = express.Router();
//---------------------------------
//var AdminToken = "true"; //|
//---------------------------------

//SELECT Id
router.get("/Id/:id", (req, res) => {
  const Id = req.params.id;
  const errors = [];
  res.json([{ Thread_Id: "tmp_1", Thread_Name: "tmp_1" }]);
});

//SELECT Name
router.get("/Name/:name", (req, res) => {
  const Name = req.params.name;
  const errors = [];
  res.json([
    { Thread_Id: "tmp_1", Thread_Name: "tmp_1" },
    { Thread_Id: "tmp_2", Thread_Name: "tmp_2" },
  ]);
});

//SELECT Category
router.get("/Category/:category", (req, res) => {
  const Category = req.params.category;
  const errors = [];
  res.json([
    { Thread_Id: "tmp_1", Thread_Name: "tmp_1" },
    { Thread_Id: "tmp_2", Thread_Name: "tmp_2" },
  ]);
});
//routerをモジュールとして扱う準備
module.exports = router;
