let userEmail = sessionStorage.getItem("email");
console.log(userEmail);
let userData;

$.ajax({
  url: "http://localhost:3000/getHome",
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

//changing home page
document.getElementById("welcomeMsg").innerHTML =
  "Welcome " + userData.fName + "! Your Goals are:";

losingOrGain();

function getWeightDiff() {
  let weightdiff = userData.startingWeight - userData.goalWeight;
  return weightdiff;
}

function losingOrGain() {
  let weightdiff = userData.startingWeight - userData.goalWeight;
  console.log(weightdiff);
  if (weightdiff > 0) {
    document.getElementById("wtMsg").innerHTML =
      "Lose " + getWeightDiff() + " Pounds";
  } else if (weightdiff < 0) {
    document.getElementById("wtMsg").innerHTML =
      "Gain " + getWeightDiff() + " Pounds";
  } else {
    document.getElementById("wtMsg").innerHTML =
      "Maintain " + userData.startingWeight + " Pounds";
  }
}

//goal Date creation and cals per day because of switch

function goalDateAndCalsPerDay() {
  let weightDiff = getWeightDiff();
  let cals = bmrCalc();
  sessionStorage.setItem("bmr", cals);
  switch (userData.goalInt) {
    case "na":
      document.getElementById("projDate").innerHTML = "Maintain";
      document.getElementById("calsNeed").innerHTML =
        "Eat " + cals + " calories";
      break;
    case "slowly":
      document.getElementById("projDate").innerHTML = newDate(
        daysToGoal(0.5 / 7)
      ).toDateString();
      if (weightDiff > 0) {
        cals = cals - 250;
      } else {
        cals = cals + 250;
      }
      document.getElementById("calsNeed").innerHTML =
        "Eat " + cals + " calories";
      break;
    case "slow":
      document.getElementById("projDate").innerHTML = newDate(
        daysToGoal(1 / 7)
      ).toDateString();
      if (weightDiff > 0) {
        cals = cals - 500;
      } else {
        cals = cals + 500;
      }
      document.getElementById("calsNeed").innerHTML =
        "Eat " + cals + " calories";
      break;
    case "moderately":
      document.getElementById("projDate").innerHTML = newDate(
        daysToGoal(1.5 / 7)
      ).toDateString();
      if (weightDiff > 0) {
        cals = cals - 750;
      } else {
        cals = cals + 750;
      }
      document.getElementById("calsNeed").innerHTML =
        "Eat " + cals + " calories";
      break;
    case "very":
      document.getElementById("projDate").innerHTML = newDate(
        daysToGoal(2 / 7)
      ).toDateString();
      if (weightDiff > 0) {
        cals = cals - 1000;
      } else {
        cals = cals + 1000;
      }
      document.getElementById("calsNeed").innerHTML =
        "Eat " + cals + " calories";
      break;
  }
}
//getting days for date function
function daysToGoal(num) {
  let days = Math.round((userData.startingWeight - userData.goalWeight) / num);
  console.log(days);
  return days;
}

goalDateAndCalsPerDay();
//getting new Date based on current
function newDate(days) {
  let currDate = new Date();
  currDate.setDate(currDate.getDate() + days);
  return currDate;
}

//converting metric to imperial funcs
function convertToMetricWeight() {
  let metricWeight = Math.round(userData.startingWeight / 2.205);
  return metricWeight;
}

function convertToMetricHeight() {
  let numHt = userData.height.split("'");
  let metricHeight = numHt[0] * 12 + numHt[1] * 1;
  metricHeight = Math.round(metricHeight * 2.54);
  return metricHeight;
}

convertToMetricWeight();
convertToMetricHeight();

//calc for calories needed per day
function bmrCalc() {
  let bmr =
    convertToMetricWeight() * 9.99 +
    convertToMetricHeight() * 6.25 -
    4.92 * userData.age;
  bmr = bmr * 1.2;
  if (userData.sex == "m") {
    bmr = bmr + 5;
    console.log(bmr);
  } else {
    bmr = bmr - 161;
    console.log(bmr);
  }
  return Math.round(bmr);
}

bmrCalc();

//switch statement function for different goals
function calsPerDay() {
  let weightDiff = getWeightDiff();
}

//waterintake function
function waterIn() {
  let water = Math.round(userData.startingWeight / 2);
  console.log(water);
  document.getElementById("waterNeed").innerHTML = "Drink " + water + "oz";
}

waterIn();
