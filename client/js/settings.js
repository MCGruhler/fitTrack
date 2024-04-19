let userEmail = sessionStorage.getItem("email");
console.log(userEmail);

//revealing form and hiding btn --------------------------------------------------------
$("#edit1").click(function () {
  document.getElementById("editGoals").style.display = "flex";
  document.getElementById("editGoals").style.gap = "3vw";
  document.getElementById("hiddenGoalText").style.display = "flex";
  document.getElementById("hiddenGoalText").style.gap = "1vw";
  document.getElementById("hiddenGoalText").style.flexDirection = "column";

  document.getElementById("goalsId").style.display = "none";
});

//revealing form and hiding btn --------------------------------------------------------
$("#edit2").click(function () {
  document.getElementById("editStats").style.display = "flex";
  document.getElementById("editStats").style.gap = "3vw";

  document.getElementById("statsId").style.display = "none";
});

//closing forms --------------------------------------------------------
$("#goalsClose").click(function () {
  document.getElementById("editGoals").style.display = "none";

  document.getElementById("goalsId").style.display = "flex";
});

$("#statsClose").click(function () {
  document.getElementById("editStats").style.display = "none";

  document.getElementById("statsId").style.display = "flex";
});

//updating goals --------------------------------------------------------
$("#updateGoals").click(function () {
  let newGoalWt = $("#newGoalWt").val();
  let newGoalInt = $("#newGoalInt").val();
  let email = userEmail;

  console.log(newGoalWt);
  console.log(newGoalInt);
  updateGoal(newGoalWt, newGoalInt, email);

  sessionStorage.setItem("email", email);
  document.getElementById("editGoals").style.display = "none";
  document.getElementById("goalsId").style.display = "flex";
  textGoals();
});

function updateGoal(newGoalWt, newGoalInt, email) {
  $.ajax({
    url: "http://localhost:3000/updateGoal",
    type: "put",
    data: {
      email: email,
      newGoalWt: newGoalWt,
      newGoalInt: newGoalInt,
    },
    success: function (res) {
      textGoals();
      console.log(res.msg);
    },
    error: function (res) {
      console.log(res.status);
    },
  });
}

//updating weight --------------------------------------------------------
$("#updateStats").click(function () {
  let currWt = $("#currWt").val();
  let email = userEmail;

  updateWeight(currWt, email);

  if (currWt <= userData.goalWeight) {
    console.log("in if statement");
    updateGoal(userData.goalWeight, "na", email);
  }

  sessionStorage.setItem("email", email);
  document.getElementById("editStats").style.display = "none";
  document.getElementById("statsId").style.display = "flex";
  textGoals();
});

function updateWeight(currWt, email) {
  $.ajax({
    url: "http://localhost:3000/updateWt",
    type: "put",
    data: {
      email: email,
      currWt: currWt,
    },
    success: function (res) {
      textGoals();
      console.log(res.msg);
    },
    error: function (res) {
      console.log(res.status);
    },
  });
}

//getting data --------------------------------------------------------

let userData;

$.ajax({
  url: "http://localhost:3000/getData",
  //to assign outside variable
  async: false,
  type: "get",
  data: {
    "email": userEmail,
  },
  success: function (res) {
    userData = JSON.parse(res);
    userData = userData.user;
    console.log(userData);
  },
  error: function (response) {
    console.log("error");
  },
});

//calc bmi ---------------------------------------------------------------------
function bmiCalc() {
  let htIn = userData.height.split("'");
  htIn = htIn[0] * 12 + parseInt(htIn[1]);
  let htSq = Math.pow(htIn, 2);
  let bmi = (userData.startingWeight / htSq) * 703;
  return bmi.toFixed(1);
}
let bmi = bmiCalc();

//updating text on html --------------------------------------------------------
function textGoals() {
  //first part of settings
  document.getElementById("welc").innerHTML = "Welcome " + userData.fName + "!";
  document.getElementById("goalWtText").innerHTML =
    "Your Goal is " + userData.goalWeight + " lbs";
  translateGoalInt();
  //second part of settings
  document.getElementById("statTitle").innerHTML =
    userData.fName + "'s Physical Info";
  document.getElementById("userWt").innerHTML =
    "Weight:" + userData.startingWeight;
  document.getElementById("userHt").innerHTML = "Height:" + userData.height;
  document.getElementById("userBMI").innerHTML = "BMI:" + bmi;
}

//updating goal intensity for readability  --------------------------------------------------------
function translateGoalInt() {
  let wordInt = userData.goalInt;
  let numInt;
  switch (wordInt) {
    case "very":
      numInt = 2;
      document.getElementById("goalIntText").innerHTML =
        "Goal Intesity: " + numInt + " lbs per week";
      break;
    case "moderately":
      numInt = 1.5;
      document.getElementById("goalIntText").innerHTML =
        "Goal Intesity: " + numInt + " lbs per week";
      break;
    case "slow":
      numInt = 1;
      document.getElementById("goalIntText").innerHTML =
        "Goal Intesity: " + numInt + " lb per week";
      break;
    case "slowly":
      numInt = 0.5;
      document.getElementById("goalIntText").innerHTML =
        "Goal Intesity: " + numInt + " lbs per week";
      break;
    case "na":
      document.getElementById("goalIntText").innerHTML = "Maintain";
      break;
  }
}
textGoals();

//logout  ----------------------------------------------------------------------------------------------------------------
$("#logout").click(function () {
  sessionStorage.clear();
  window.location.href = "/login";
});
