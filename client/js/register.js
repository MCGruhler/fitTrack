$("#registerSub").click(function () {
  let fName = $("#fName").val();
  let lName = $("#lName").val();
  let email = $("#email").val();
  let pWord = $("#pword").val();
  let height = $("#htFt").val() + "'" + $("#htIn").val();
  let startingWeight = $("#wt").val();
  let goalWeight = $("#gWt").val();
  let goalInt = $("#goalInt").val();
  let age = $("#age").val();
  let sex = $("#sex").val();

  console.log("in the click func pt 2");

  clickRegister(
    fName,
    lName,
    email,
    pWord,
    height,
    startingWeight,
    goalWeight,
    goalInt,
    age,
    sex
  );
});

console.log("in js, outside the func pt 1");

function clickRegister(
  fName,
  lName,
  email,
  pWord,
  height,
  startingWeight,
  goalWeight,
  goalInt,
  age,
  sex
) {
  console.log("before ajax call pt 3");
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
      age: age,
      sex: sex,
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
