const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

try {
  router.use("/Category", require("./Category.js"));
  router.use("/ThreadInfo", require("./ThreadInfo.js"));
  router.use("/Thread", require("./Thread.js"));
  router.use("/Comment", require("./Comment.js"));

  router.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
  });
  router.post("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
  });
  router.put("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
  });
  router.delete("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
  });
} catch (err) {
  console.log(err);
  throw new Error(err);
}

//routerをモジュールとして扱う準備
module.exports = router;
