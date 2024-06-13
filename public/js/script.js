$(".info-item .btn").click(function () {
  $(".container").toggleClass("log-in");
});
$(".container-form .btn").click(function () {
  $(".container").addClass("active");
});

const isAuthenticated = () => {
  let user = localStorage.getItem("user");
  if (user) {
    window.location.href = "http://127.0.0.1:3000";
  }
}

window.onload = function () {
  document.getElementById("loader-container").style.display = "none";
  isAuthenticated();
};

document
  .getElementById("login_btn")
  .addEventListener("click", performLogin, true);

  document
  .getElementById("register_btn")
  .addEventListener("click", registerForm, true);

function performLogin(event) {
  event.preventDefault();
  var uName = document.forms["loginForm"]["Username"].value;
  var pass = document.forms["loginForm"]["Password"].value;
  if (uName == "" || uName == null) {
    alert("Username must be filled out!");
    return false;
  }
  if (pass == "" || uName == null) {
    alert("Password must be filled out!");
    return false;
  }

  // form is validated
  document.getElementById("loader-container").style.display = "flex";
  axios({
    method: "post",
    url: "http://127.0.0.1:3000/api/login",
    data: {
      username: uName,
      password: pass
    }
  })
    .then(function (response) {
      document.getElementById("loader-container").style.display = "none";
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "http://127.0.0.1:3000";
    })
    .catch(function (error) {
      document.getElementById("loader-container").style.display = "none";
      alert(error.response.data.error);
      // Handle error responses
    });
};

function registerForm(event) {
  event.preventDefault();
  var email = document.forms["regForm"]["email"].value;
  var fullName = document.forms["regForm"]["fullName"].value;
  var username = document.forms["regForm"]["Username"].value;
  var password = document.forms["regForm"]["Password"].value;
  var confPassword = document.forms["regForm"]["confPassword"].value;

  if (email === "" || fullName === "" || username === "" || password === "" || confPassword === "") {
    alert("Please fill up all fields!");
    return false;
  }

  if (password !== confPassword) {
    alert("Password and Confirm Password do not match!");
    return false;
  }

  // Form is validated
  document.getElementById("loader-container").style.display = "flex";
  axios({
    method: "post",
    url: "http://127.0.0.1:3000/api/register",
    data: {
      email: email,
      fullName: fullName,
      username: username,
      password: password
    }
  })
    .then(function (response) {
      document.getElementById("loader-container").style.display = "none";
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "http://127.0.0.1:3000";
    })
    .catch(function (error) {
      document.getElementById("loader-container").style.display = "none";
      alert(error.response.data.error);
    });
};
