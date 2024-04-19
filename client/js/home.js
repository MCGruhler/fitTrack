let userEmail = sessionStorage.getItem("email");
console.log(userEmail);
let userData;

$.ajax({
  url: "http://localhost:3000/getData",
  //to assign outside variable --------------------------------------------------------------------------------------------------
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

//changing home page --------------------------------------------------------------------------------------------------
document.getElementById("welcomeMsg").innerHTML =
  "Welcome " + userData.fName + "! Your Goals are:";

losingOrGain();

//func to find weight difference and set up total goal dif and gain or lossing -------------------------------------------------
function getWeightDiff() {
  let weightdiff = userData.startingWeight - userData.goalWeight;
  return weightdiff;
}

//func to determine with weight diff func the goals of the person -------------------------------------------------
function losingOrGain() {
  let weightdiff = userData.startingWeight - userData.goalWeight;
  console.log(weightdiff);
  if (weightdiff > 0) {
    document.getElementById("wtMsg").innerHTML =
      "Lose " + getWeightDiff() + " Pounds";
  } else if (weightdiff < 0) {
    document.getElementById("wtMsg").innerHTML =
      "Gain " + getWeightDiff() * -1 + " Pounds";
  } else {
    document.getElementById("wtMsg").innerHTML =
      "Maintain " + userData.startingWeight + " Pounds";
  }
}

//goal Date creation and cals per day because of switch, includes saving BMR for each int -------------------------------------------------
function goalDateAndCalsPerDay() {
  let weightDiff = getWeightDiff();
  let cals = bmrCalc();
  switch (userData.goalInt) {
    case "na":
      document.getElementById("projDate").innerHTML = "Maintain";
      document.getElementById("calsNeed").innerHTML =
        "Eat " + cals + " calories";
      sessionStorage.setItem("bmr", cals);
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
      sessionStorage.setItem("bmr", cals);
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
      sessionStorage.setItem("bmr", cals);
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
      sessionStorage.setItem("bmr", cals);
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
      sessionStorage.setItem("bmr", cals);
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

//converting metric to imperial funcs -------------------------------------------------
function convertToMetricWeight() {
  let metricWeight = Math.round(userData.startingWeight / 2.205);
  return metricWeight;
}

//converting metric to imperial funcs -------------------------------------------------
function convertToMetricHeight() {
  let numHt = userData.height.split("'");
  let metricHeight = numHt[0] * 12 + numHt[1] * 1;
  metricHeight = Math.round(metricHeight * 2.54);
  return metricHeight;
}

convertToMetricWeight();
convertToMetricHeight();

//calc for calories needed per day -------------------------------------------------
function bmrCalc() {
  let bmr =
    convertToMetricWeight() * 9.99 +
    convertToMetricHeight() * 6.25 -
    4.92 * userData.age;
  bmr = bmr * 1.375;
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

//switch statement function for different goals -------------------------------------------------
function calsPerDay() {
  let weightDiff = getWeightDiff();
}

//waterintake function -------------------------------------------------
function waterIn() {
  let water = Math.round(userData.startingWeight / 2);
  console.log(water);
  document.getElementById("waterNeed").innerHTML = "Drink " + water + "oz";
}

waterIn();
