const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

//set up the view engine
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");

app.use(
    cors({
      origin: "*",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );
  app.options("*", cors());
  var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  };
  app.use(allowCrossDomain);
// Connection URI
const uri = process.env.DB_URL;
// Create a new MongoClient
const client = new MongoClient(uri);
//8-ioT1yvs4rTYzFhxZFMOa0GGETBhHkvTRDUm2km

module.exports.app = app;
module.exports.client = client;
