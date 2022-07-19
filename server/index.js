const express = require("express");

const app = express();

//handle cors
var cors = require("cors");

var allowlist = ["http://localhost:3000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

//handleconnectSever

const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: null,
  database: "onlinebook",
});
app.get("/", cors(corsOptionsDelegate), function (req, res) {
  const sql = "SELECT * FROM `user`";
  pool.query(sql, function (error, result) {
    if (error) throw error;
    res.json(result);
  });
});



app.listen("5000", "127.0.0.1");
console.log("—– server is listening —–");
