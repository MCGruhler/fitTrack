const MongoClient = require("mongodb").MongoClient;

//database var
const dbURL = "mongodb://localhost:27017/";

let services = function (app) {
  //for registration ----------------------------------------------------------------------------------------------------------------

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
      age: req.body.age,
      sex: req.body.sex,
    };

    //create arr for recieved obj values
    const userArr = Array.from(Object.values(reviewUserData));

    //create function to check if a val is empty
    const userEmpty = (userInfo) => userInfo != "";

    const user = { email: req.body.email };

    MongoClient.connect(dbURL, { useUnifiedTopology: true }).then((client) => {
      //check if all fields are filled, if it returns false on one return an error to client
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
        } catch (error) {
          return res.status(500).send(JSON.stringify({ msg: "Server Error" }));
        }
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

  //for login--------------------------------------------------------------------------------------------------------------------------------------------------------------------
  app.post("/login", function (req, res) {
    const reviewUserData = {
      email: req.body.email,
      pWord: req.body.pWord,
    };
    console.log(req);

    //create arr for recieved obj values
    const userArr = Array.from(Object.values(reviewUserData));

    //create function to check if a val is empty
    const userEmpty = (userInfo) => userInfo != "";

    const userEmail = { email: req.body.email };

    MongoClient.connect(dbURL, { useUnifiedTopology: true }).then((client) => {
      //check if all both fields are filled, if it returns false on one return an error to client
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
        } catch (error) {
          return res.status(500).send(JSON.stringify({ msg: "Server Error" }));
        }
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

  //getter for home ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  app.get("/getData", function (req, res) {
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
        } catch (error) {
          return res.status(500).send(JSON.stringify({ msg: "Server Error" }));
        }
      }
      getUser();
    });
  });

  //input for Food ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  app.post("/foodInput", function (req, res) {
    const reviewUserData = {
      userEmail: req.body.userEmail,
      food: req.body.food,
      cals: req.body.cals,
      serv: req.body.serv,
      foodDate: req.body.foodDate,
    };

    MongoClient.connect(dbURL, { useUnifiedTopology: true }).then((client) => {
      //return success
      client.db("fitTrackDB").collection("userFood").insertOne(reviewUserData);
      return res.status(200).send(JSON.stringify({ msg: "success" }));
    });
  });

  //getter for Food------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  app.get("/readFood", function (req, res) {
    let userEmail = req.query.email;
    let date = req.query.date;
    //console.log(req);
    //console.log(userEmail);
    //console.log(date);
    MongoClient.connect(dbURL, { useUnifiedTopology: true }).then((client) => {
      async function getFoodData() {
        try {
          const food = await client
            .db("fitTrackDB")
            .collection("userFood")
            .find({ userEmail: userEmail, foodDate: date })
            .toArray(function (err, data) {
              if (err) {
                return res.status(201).send(JSON.stringify({ msg: err }));
              } else {
                return res
                  .status(200)
                  .send(JSON.stringify({ msg: "SUCCESS", foodData: data }));
              }
            });
          //console.log(food);
          return res.status(200).send(JSON.stringify({ msg: "success", food }));
        } catch (error) {
          return res.status(500).send(JSON.stringify({ msg: "Server Error" }));
        }
      }
      getFoodData();
    });
  });

  //input for Exercise ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  app.post("/exInput", function (req, res) {
    const reviewUserData = {
      userEmail: req.body.userEmail,
      type: req.body.type,
      musc: req.body.musc,
      sets: req.body.sets,
      reps: req.body.reps,
      gymWeight: req.body.gymWeight,
      exDate: req.body.exDate,
    };

    MongoClient.connect(dbURL, { useUnifiedTopology: true }).then((client) => {
      //return success
      client
        .db("fitTrackDB")
        .collection("userExercise")
        .insertOne(reviewUserData);
      return res.status(200).send(JSON.stringify({ msg: "success" }));
    });
  });

  //getter for Exercise ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  app.get("/readEx", function (req, res) {
    let userEmail = req.query.email;
    let date = req.query.date;
    //console.log(userEmail);
    //console.log(date);
    MongoClient.connect(dbURL, { useUnifiedTopology: true }).then((client) => {
      async function getExData() {
        try {
          //console.log("im here");
          const exercise = await client
            .db("fitTrackDB")
            .collection("userExercise")
            .find({ userEmail: userEmail, exDate: date })
            .toArray(function (err, data) {
              if (err) {
                //console.log("error");
                return res.status(201).send(JSON.stringify({ msg: err }));
              } else {
                //console.log("success");
                return res
                  .status(200)
                  .send(JSON.stringify({ msg: "SUCCESS", getExData: data }));
              }
            });
          //console.log(exercise);
          return res
            .status(200)
            .send(JSON.stringify({ msg: "success", exercise }));
        } catch (error) {
          return res.status(500).send(JSON.stringify({ msg: "Server Error" }));
        }
      }
      getExData();
    });
  });
  //update for Goal ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  app.put("/updateGoal", function (req, res) {
    let userEmail = req.body.email;
    let newGoalWt = req.body.newGoalWt;
    let newGoalInt = req.body.newGoalInt;

    let updateData = {
      $set: { goalWeight: newGoalWt, goalInt: newGoalInt },
    };

    MongoClient.connect(dbURL, { useUnifiedTopology: true }).then((client) => {
      console.log(userEmail);
      async function updateGoals() {
        try {
          const updating = await client
            .db("fitTrackDB")
            .collection("users")
            .updateOne({ email: userEmail }, updateData);
          console.log(updating);
        } catch (error) {
          return res.status(500).send(JSON.stringify({ msg: "Server Error" }));
        }
      }
      updateGoals();
    });
  });
  //update for Weight ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  app.put("/updateWt", function (req, res) {
    let userEmail = req.body.email;
    let currWt = req.body.currWt;

    let updateData = {
      $set: { startingWeight: currWt },
    };

    MongoClient.connect(dbURL, { useUnifiedTopology: true }).then((client) => {
      console.log(userEmail);
      async function updateWeight() {
        try {
          const updating = await client
            .db("fitTrackDB")
            .collection("users")
            .updateOne({ email: userEmail }, updateData);
          console.log(updating);
        } catch (error) {
          return res.status(500).send(JSON.stringify({ msg: "Server Error" }));
        }
      }
      updateWeight();
    });
  });
};

module.exports = services;
