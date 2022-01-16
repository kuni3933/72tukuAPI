const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

try {
  router.use("/Category", require("./Category.js"));
  router.use("/ThreadInfo", require("./ThreadInfo.js"));
  router.use("/Thread", require("./Thread.js"));
  router.use("/Comment", require("./Comment.js"));

  /*
  const obj = {
    tmp: "tmp",
    tmp_array: [{ tmp_1: "tmp_1" }, { tmp_2: "tmp_2" }],
  };
  const json = JSON.stringify(obj);
  console.log(json);
  const decode = JSON.parse(json);
  console.log(decode.tmp_array[0]);
*/

  router.get("/", (req, res) => {
    res.status(200).json(
      JSON.stringify({
        message: "Hello,world",
      })
    );
  });
  router.post("/", (req, res) => {
    res.status(200).json(
      JSON.stringify({
        message: "Hello,world",
      })
    );
  });
  router.put("/", (req, res) => {
    res.status(200).json(
      JSON.stringify({
        message: "Hello,world",
      })
    );
  });
  router.delete("/", (req, res) => {
    res.status(200).json(
      JSON.stringify({
        message: "Hello,world",
      })
    );
  });
} catch (err) {
  console.log(err);
  res.status(404).json(JSON.stringify({ Error: "Error" }));
  throw new Error(err);
}

//routerをモジュールとして扱う準備
module.exports = router;
