const fs = require("fs");
const path = require("path");
const glob = require("glob");

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

//database var
const dbURL = "mongodb://localhost:27017/";

let services = function (app) {
  //for registration--------------------------------------------
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

    const user = { email: req.body.email };

    MongoClient.connect(dbURL, { useUnifiedTopology: true }).then((client) => {
      if (!userArr.every(userEmpty)) {
        return res.status(400).send(JSON.stringify({ msg: "err" }));
      }
      //finding if an user exsits
      const userExsits = async function findAUser() {
        try {
          const result = await client
            .db("fitTrackDB")
            .collection("users")
            .findOne(user);
          console.log(result);
          return result;
        } catch (error) {}
      };
      userExsits().then((result) => {
        if (result != null) {
          //checking and returning error if email already exsists
          return res.status(409).send(JSON.stringify({ msg: "error" }));
        } else {
          //return success
          client.db("fitTrackDB").collection("users").insertOne(reviewUserData);
          return res.status(200).send(JSON.stringify({ msg: "success" }));
        }
      });
    });
  });
  //for login----------------------------------------------------
  app.post("/login", function (req, res) {
    const reviewUserData = {
      email: req.body.email,
      pWord: req.body.pWord,
    };

    const userArr = Array.from(Object.values(reviewUserData));
    const userEmpty = (userInfo) => userInfo != "";

    const userEmail = { email: req.body.email };

    MongoClient.connect(dbURL, { useUnifiedTopology: true }).then((client) => {
      if (!userArr.every(userEmpty)) {
        return res.status(400).send(JSON.stringify({ msg: "err" }));
      }

      const emailFind = async function findUserOne() {
        try {
          const result = await client
            .db("fitTrackDB")
            .collection("users")
            .findOne(userEmail);
          console.log(result);
          return result;
        } catch (error) {}
      };
      emailFind().then((result) => {
        if (result != null) {
          savedPword = result.pWord;
          if (savedPword == reviewUserData.pWord) {
            return res.status(200).send(JSON.stringify({ msg: "success" }));
          } else {
            //send if password does not match
            return res.status(401).send(JSON.stringify({ msg: "error" }));
          }
        } else {
          return res.status(404).send(JSON.stringify({ msg: "error" }));
        }
      });
    });
  });
  //getter for home
  app.get("/getHome", function (req, res) {
    let userEmail = req.query.email;
    MongoClient.connect(dbURL, { useUnifiedTopology: true }).then((client) => {
      async function getUser() {
        try {
          const user = await client
            .db("fitTrackDB")
            .collection("users")
            .findOne({ email: userEmail });
          console.log(user);
          return res.status(200).send(JSON.stringify({ msg: "success", user }));
        } catch (error) {}
      }
      getUser();
    });
  });
};

module.exports = services;
