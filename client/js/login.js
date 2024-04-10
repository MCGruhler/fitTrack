$("#loginBut").click(function () {
  let email = $("#email").val();
  let pWord = $("#pword").val();

  clickLogIn(email, pWord);
});

function clickLogIn(email, pWord) {
  console.log("before ajax call");
  $.ajax({
    url: "http://localhost:3000/login",
    type: "POST",
    data: {
      email: email,
      pWord: pWord,
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
      if (res.status == 401) {
        alert("Incorrect Password");
      }
      if (res.status == 404) {
        alert("Email not found");
      }
      console.log(res.status);
    },
  });
}
