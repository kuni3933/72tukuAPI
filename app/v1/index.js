const express = require("express");
const router = express.Router();

try {
  router.use("/Category", require("./Category.js"));
  router.use("/ThreadInfo", require("./ThreadInfo.js"));
  router.use("/Thread", require("./Thread.js"));
  router.use("/Comment", require("./Comment.js"));

  router.get("/", function (req, res) {
    res.status(200).json(
      JSON.stringify({
        message: "Hello,world",
      })
    );
  });
  router.post("/", function (req, res) {
    res.status(200).json(
      JSON.stringify({
        message: "Hello,world",
      })
    );
  });
  router.put("/", function (req, res) {
    res.status(200).json(
      JSON.stringify({
        message: "Hello,world",
      })
    );
  });
  router.delete("/", function (req, res) {
    res.status(200).json(
      JSON.stringify({
        message: "Hello,world",
      })
    );
  });
} catch (err) {
  throw new Error(err);
}

//routerをモジュールとして扱う準備
module.exports = router;
