const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

try {
  router.use("/Category", require("./Category.js"));
  router.use("/ThreadInfo", require("./ThreadInfo.js"));
  router.use("/Thread", require("./Thread.js"));
  router.use("/Comment", require("./Comment.js"));

  router.get("/", (req, res) => {
    res.status(200).json({ message: "Hello,world" });
  });
  router.post("/", (req, res) => {
    res.status(200).json({ message: "Hello,world" });
  });
  router.put("/", (req, res) => {
    res.status(200).json({ message: "Hello,world" });
  });
  router.delete("/", (req, res) => {
    res.status(200).json({ message: "Hello,world" });
  });
} catch (err) {
  console.log(err);
  throw new Error(err);
}

//routerをモジュールとして扱う準備
module.exports = router;
