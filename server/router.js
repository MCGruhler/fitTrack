const path = require("path");

//Page listeners
let router = function (app) {
  app.get("/", function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/register.html"));
  });

  app.get("/login", function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/index.html"));
  });

  app.get("/home", function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/home.html"));
  });

  app.get("/settings", function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/settings.html"));
  });

  app.get("/diet", function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/diet.html"));
  });

  app.get("/exercise", function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/exercise.html"));
  });
};

module.exports = router;
