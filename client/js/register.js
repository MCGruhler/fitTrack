$("#registerSub").click(function () {
  let fName = $("#fName").val();
  console.log(fName);
  let lName = $("#lName").val();
  let email = $("#email").val();
  let pWord = $("#pword").val();
  let height = $("#htFt").val() + "'" + $("#htIn").val() + '"';
  console.log(height);
  let startingWeight = $("#wt").val();
  let goalWeight = $("#gWt").val();
  let goalInt = $("#goalInt").val();

  console.log("i worked");

  clickRegister(
    fName,
    lName,
    email,
    pWord,
    height,
    startingWeight,
    goalWeight,
    goalInt
  );
});

function clickRegister(
  fName,
  lName,
  email,
  pWord,
  height,
  startingWeight,
  goalWeight,
  goalInt
) {
  $.ajax({
    url: "http://localhost:3000/register",
    type: "post",
    data: {
      fName: fName,
      lName: lName,
      email: email,
      pWord: pWord,
      height: height,
      startingWeight: startingWeight,
      goalWeight: goalWeight,
      goalInt: goalInt,
    },
    success: function (response) {
      let data = JSON.parse(response);
      console.log(data);
    },
    error: function (response) {
      console.log("error");
    },
  });
}
