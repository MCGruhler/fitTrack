const fs = require("fs");
const path = require("path");
const glob = require("glob");

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

//database var
const dbURL = "mongodb://localhost:27017/";

let services = function (app) {
  app.post("/register", function (req, res) {
    //let search = { email: req.body.email };
    //console.log(search);

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

    const userArr = Array.from(Object.values(reviewUserData));
    const userEmpty = (userInfo) => userInfo != "";

    MongoClient.connect(dbURL, { useUnifiedTopology: true }).then((client) => {
      if (!userArr.every(userEmpty)) {
        return res.status(400).send(JSON.stringify({ msg: "err" }));
      }
      // if (emailLen.length > 0) {
      // return res.status(409).send(JSON.stringify({ msg: "err" }));
      //}
      return client
        .db("fitTrackDB")
        .collection("users")
        .insertOne(reviewUserData);
    });
  });
};

module.exports = services;
