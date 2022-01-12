const express = require("express");
require("dotenv").config();

const router = express.Router();

router.use("/Category", require("./Category.js"));
router.use("/ThreadInfo", require("./ThreadInfo.js"));
router.use("/Thread", require("./Thread.js"));
router.use("/Comment", require("./Comment.js"));

router.get("/", function (req, res) {
  res.json({
    message: "Hello,world",
  });
});

//routerをモジュールとして扱う準備
module.exports = router;
