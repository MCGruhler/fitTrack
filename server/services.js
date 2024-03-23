const fs = require("fs");
const path = require("path");
const glob = require("glob");

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

//database var
const dbURL = "mongodb://localhost:27017/";
const dbName = "fitTrackDB"; // Database Name

let services = function (app) {
  app.post("/register", function (req, res) {
    const reviewUserData = {
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      pWord: req.body.pWord,
      height: req.body.height,
      startingWeight: req.body.startingWeight,
      goalWeight: req.body.goalWeight,
      goalInt: req.body.goalInt,
    };


    MongoClient.connect(dbURL, { useUnifiedTopology: true }).then((client) => {
      return client
        .db("fitTrackDB")
        .collection("users")
        .insertOne(reviewUserData);
    });
  });
};

module.exports = services;
