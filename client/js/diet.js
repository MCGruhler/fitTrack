//continue session storage
let email = sessionStorage.getItem("email");
let bmr = sessionStorage.getItem("bmr");
console.log(email);
console.log(bmr);

//revealing form and hiding btn --------------------------------------------------------
$("#addBtn").click(function () {
  document.getElementById("foodInput").style.display = "flex";
  document.getElementById("foodInput").style.gap = "1vw";

  document.getElementById("addBtn").style.display = "none";
});
//canceling form and hiding it --------------------------------------------------------
$("#delete").click(function () {
  document.getElementById("foodInput").style.display = "none";

  document.getElementById("addBtn").style.display = "flex";
});

document.getElementById("foodDate").valueAsDate = new Date();
let date = $("#foodDate").val();

//sumbit new food btn and call func --------------------------------------------------------
$("#newFood").click(function () {
  let food = $("#food").val();
  let cals = $("#cals").val();
  let serv = $("#serv").val();
  let userEmail = email;
  let foodDate = $("#foodDate").val();

  sumbitFood(food, cals, serv, userEmail, foodDate);

  getFoodData();
  sessionStorage.setItem("email", userEmail);
  document.getElementById("foodInput").style.display = "none";
  document.getElementById("addBtn").style.display = "flex";
});

//ajax call post for new food --------------------------------------------------------
function sumbitFood(food, cals, serv, userEmail, foodDate) {
  $.ajax({
    url: "http://localhost:3000/foodInput",
    type: "POST",
    data: {
      userEmail: userEmail,
      food: food,
      cals: cals,
      serv: serv,
      foodDate: foodDate,
    },
    success: function (res) {
      console.log(res.msg);
    },
    error: function (res) {
      if (res.status == 400) {
        alert("All fields are required");
      }
      console.log(res.status);
    },
  });
}

//ajax call getter for table info --------------------------------------------------------
function getFoodData() {
  console.log("in func");
  $.ajax({
    url: "http://localhost:3000/readFood",
    type: "get",
    data: {
      "email": email,
      "date": date,
    },
    success: function (response) {
      let data = JSON.parse(response);
      console.log("here");
      console.log(data.food);
      drawTable(data.food);
      calsLeft(data.food);
      //showTable(data);
    },
    error: function (response) {
      console.log("maybe here");
      console.log("error");
    },
  });
}

getFoodData();

//function draw table to get info on table in html --------------------------------------------------------
function drawTable(object) {
  let htmlString = "";
  for (let i = 0; i < object.length; i++) {
    htmlString += "<tr>";
    htmlString += "<td>" + object[i].food + "</td>";
    htmlString += "<td>" + object[i].cals + "</td>";
    htmlString += "<td>" + object[i].serv + "</td>";
    htmlString += "</tr>";
  }

  $("#foodTable").html(htmlString);
}

//event changer for date to add or view old data --------------------------------------------------------
document.getElementById("foodDate").addEventListener("change", function (e) {
  console.log("something happened to my date");
  date = $("#foodDate").val();
  getFoodData();
});

//function to calculate cals left for day --------------------------------------------------------
function calsLeft(foodObj) {
  let calsEaten = 0;
  let calsLeft = 0;
  for (let i = 0; i < foodObj.length; i++) {
    calsEaten += +foodObj[i].cals;
  }
  calsLeft = bmr - calsEaten;
  console.log(calsLeft);
  document.getElementById("calsLeftHeader").innerHTML =
    calsLeft + " Calories Left";
}
