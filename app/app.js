require("dotenv").config();

const express = require("express");
const app = express();

const favicon = require("serve-favicon");

const cors = require("cors");

// 配列型フォームデータの通信を許可
app.use(express.urlencoded({ extended: true }));

// jsonを使えるようにする
app.use(express.json());

// CORS設定。異なるURLからでも呼び出せるようにする
app.use(cors());

// ファビコン設定
app.use(
  favicon(
    __dirname + "/" + "nanichan_icon1.ico",
    (maxAge = 1000 * 60 * 60 * 24 * 30)
  )
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello,world" });
});
app.post("/", (req, res) => {
  res.status(200).json({ message: "Hello,world" });
});
app.put("/", (req, res) => {
  res.status(200).json({ message: "Hello,world" });
});
app.delete("/", (req, res) => {
  res.status(200).json({ message: "Hello,world" });
});

// "app/v1"を定数v1に読み込む
const v1 = require("./v1/");

// v1を"/v1/"アクセスのapiとして扱う
app.use("/v1/", v1);

// http://future-is-now-k02.blogspot.com/2012/11/nodejs-expressurl404.html
//エラーハンドリング(404)
app.use(function (req, res, next) {
  res.status(404).json({ status: 0, Error: "Error" });
});

//todo
// エラーハンドリング(500)
process.on("uncaughtException", (err) => {
  console.log(err);
  res.status(500).json({ status: 0, Error: "Error" });
});

// 環境変数PORT || 3000 をポート番号に指定
const port = process.env.PORT || 3000;

//サーバ起動
app.listen(port);
console.log("listen on port " + port);
