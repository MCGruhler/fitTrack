$("#registerSub").click(function () {
  let fName = $("#fName").val();
  let lName = $("#lName").val();
  let email = $("#email").val();
  let pWord = $("#pword").val();
  let height = $("#htFt").val() + "'" + $("#htIn").val() + '"';
  let startingWeight = $("#wt").val();
  let goalWeight = $("#gWt").val();
  let goalInt = $("#goalInt").val();

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
  console.log("before ajax call");
  $.ajax({
    url: "http://localhost:3000/register",
    type: "POST",
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
    success: function (res) {
      console.log(res.msg);
      sessionStorage.setItem("email", email);
      window.location.href = "/home";
    },
    error: function (res) {
      if (res.status == 400) {
        alert("All fields are required");
      }
      if (res.status == 409) {
        alert("You Already have an Account");
      }
      console.log(res.status);
    },
  });
}
