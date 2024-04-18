//continue session storage
let email = sessionStorage.getItem("email");
console.log(email);

//revealing form and hiding btn --------------------------------------------------------
$("#addBtn").click(function () {
  document.getElementById("exerciseInput").style.display = "flex";
  document.getElementById("exerciseInput").style.gap = "1vw";

  document.getElementById("addBtn").style.display = "none";
});
//canceling form and hiding it --------------------------------------------------------
$("#delete").click(function () {
  document.getElementById("exerciseInput").style.display = "none";

  document.getElementById("addBtn").style.display = "flex";
});

document.getElementById("exDate").valueAsDate = new Date();
let date = $("#exDate").val();

//sumbit new ex btn and call func --------------------------------------------------------
$("#newExercise").click(function () {
  let type = $("#type").val();
  let musc = $("#musc").val();
  let sets = $("#sets").val();
  let reps = $("#reps").val();
  let gymWeight = $("#gymWeight").val();
  let userEmail = email;
  let exDate = $("#exDate").val();

  sumbitEx(type, musc, sets, reps, gymWeight, userEmail, exDate);

  getExData();
  sessionStorage.setItem("email", userEmail);
  document.getElementById("exerciseInput").style.display = "none";
  document.getElementById("addBtn").style.display = "flex";
});

//ajax call post for new ex --------------------------------------------------------
function sumbitEx(type, musc, sets, reps, gymWeight, userEmail, exDate) {
  $.ajax({
    url: "http://localhost:3000/exInput",
    type: "POST",
    data: {
      userEmail: userEmail,
      type: type,
      musc: musc,
      sets: sets,
      reps: reps,
      gymWeight: gymWeight,
      exDate: exDate,
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
function getExData() {
  console.log("in func");
  $.ajax({
    url: "http://localhost:3000/readEx",
    type: "get",
    data: {
      "email": email,
      "date": date,
    },
    success: function (response) {
      let data = JSON.parse(response);
      drawTable(data.exercise);
      totalEx(data.exercise);
    },
    error: function (response) {
      console.log("error");
    },
  });
}

getExData();

//function draw table to get info on table in html --------------------------------------------------------
function drawTable(object) {
  let htmlString = "";
  for (let i = 0; i < object.length; i++) {
    htmlString += "<tr>";
    htmlString += "<td>" + object[i].type + "</td>";
    htmlString += "<td>" + object[i].musc + "</td>";
    htmlString += "<td>" + object[i].sets + "</td>";
    htmlString += "<td>" + object[i].reps + "</td>";
    htmlString += "<td>" + object[i].gymWeight + "</td>";
    htmlString += "</tr>";
  }

  $("#exTBody").html(htmlString);
}

//event changer for date to add or view old data --------------------------------------------------------
document.getElementById("exDate").addEventListener("change", function (e) {
  console.log("something happened to my date");
  date = $("#exDate").val();
  getExData();
});

//function to calculate cals left for day --------------------------------------------------------
function totalEx(exObj) {
  let total = exObj.length;

  console.log(total);
  if (total > 1) {
    document.getElementById("totalExHeader").innerHTML =
      total + " Activites Done!";
  } else if (total == 1) {
    document.getElementById("totalExHeader").innerHTML =
      total + " Activity Done!";
  } else {
    document.getElementById("totalExHeader").innerHTML =
      "Log Your First Activity of the Day!";
  }
}
