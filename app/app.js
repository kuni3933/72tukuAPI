const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();

// 配列型フォームデータの通信を許可
app.use(express.urlencoded({ extended: true }));

// jsonを使えるようにする
app.use(express.json());

// CORS設定。異なるURLからでも呼び出せるようにする
app.use(cors());

// "app/v1"を定数v1に読み込む
const v1 = require("./v1/");
//　outerを"/v1/"アクセスのapiとして扱う
app.use("/v1/", v1);

// エラーハンドリング
process.on("uncaughtException", (err) => {
  console.log(err);
  res.json({ Error: "Error" });
});

// 環境変数PORT || 3000　をポート番号に指定
const port = process.env.PORT || 3000;

//サーバ起動
app.listen(port);
console.log("listen on port " + port);
