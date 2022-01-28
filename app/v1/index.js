const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

try {
  router.use("/Category", require("./Category.js"));
  router.use("/ThreadInfo", require("./ThreadInfo.js"));
  router.use("/Thread", require("./Thread.js"));
  router.use("/Comment", require("./Comment.js"));

  router.get("/", (req, res) => {
    const obj = { message: "Hello World!" };
    res.status(200).json(obj);
  });
  router.post("/", (req, res) => {
    const obj = { message: "Hello World!" };
    res.status(200).json(obj);
  });
  router.put("/", (req, res) => {
    const obj = { message: "Hello World!" };
    res.status(200).json(obj);
  });
  router.delete("/", (req, res) => {
    const obj = { message: "Hello World!" };
    res.status(200).json(obj);
  });
} catch (err) {
  console.log(err);
  throw new Error(err);
}

//routerをモジュールとして扱う準備
module.exports = router;
