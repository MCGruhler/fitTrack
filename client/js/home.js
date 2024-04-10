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

//still working

function goalDate() {
  switch (userData.goalInt) {
    case "na":
      console.log(maintainence);
      break;
    case "slowly":
  }
}

function daysToGoal(num) {
  let days = userData.startingWeight - userData.goalWeight / num;
  return days;
}
