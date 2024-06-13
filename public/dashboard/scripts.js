// Mansheen's code
const isAuthenticated = () => {
  let user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "http://127.0.0.1:3000/login.html";
  }
}

// Refreshing the page for home and logo
function refreshPage() {
  window.location.reload();
}

// onclick scroll for categories, about us and contact us navbar
document
  .getElementById("categories_tab")
  .addEventListener("click", scrollCategories, true);
function scrollCategories() {
  document.querySelector("html,body").scroll({
    top: document.querySelector(".stripe_1").offsetTop,
    behavior: "smooth",
  });
}

document
  .getElementById("about_us_tab")
  .addEventListener("click", scrollAboutUs, true);
function scrollAboutUs() {
  console.log("abot");
  document.querySelector("html,body").scroll({
    top: document.querySelector(".about_us_page").offsetTop,
    behavior: "smooth",
  });
}

document
  .getElementById("contact_us_tab")
  .addEventListener("click", scrollContactUs, true);
function scrollContactUs() {
  console.log("cta");
  document.querySelector("html,body").scroll({
    top: document.querySelector(".cta_page").offsetTop,
    behavior: "smooth",
  });
}

// redirecting to search page
document
  .getElementById("search_tab")
  .addEventListener("click", redirectSearchPage, true);
document
  .getElementById("button")
  .addEventListener("click", redirectSearchPage, true);
function redirectSearchPage() {
  location.href = "http://127.0.0.1:3000/clothes";
}

document
  .getElementById("logout_btn")
  .addEventListener("click", logoutUser, true);

function logoutUser() {
  localStorage.removeItem("user");
  window.location.href = "http://127.0.0.1:3000/login.html";
}

// redirecting to mens section
document
  .getElementById("men_categories")
  .addEventListener("click", redirectMenPage, true);
function redirectMenPage() {
  location.href = "http://127.0.0.1:3000/clothes?category=Men";
}

// redirecting to womens section
document
  .getElementById("women_categories")
  .addEventListener("click", redirectWomenPage, true);
function redirectWomenPage() {
  location.href = "http://127.0.0.1:3000/clothes?category=Women";
}

// redirecting to kids section
document
  .getElementById("kids_categories")
  .addEventListener("click", redirectKidsPage, true);
function redirectKidsPage() {
  location.href = "http://127.0.0.1:3000/clothes?category=Kids";
}


// logout-dropdown menu
document
  .getElementById("logout_tab")
  .addEventListener("click", myFunction, true);
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".logout_tab")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// redirecting to handles
//Facebook
document
  .getElementById("fb_handle")
  .addEventListener("click", redirectFacebookPage, true);
function redirectFacebookPage() {
  window.open(
    "https://www.facebook.com/rewearit.ath/",
    "_blank"
  );
}
//Instagram
document
  .getElementById("insta_handle")
  .addEventListener("click", redirectInstagramPage, true);
function redirectInstagramPage() {
  window.open("https://www.instagram.com/rewearit.ath/?hl=en", "_blank");
}

//Youtube
document
  .getElementById("youtube_handle")
  .addEventListener("click", redirectYoutubePage, true);
function redirectYoutubePage() {
  window.open("https://www.youtube.com/@RewearIt", "_blank");
}

// scrolling down from footer
document
  .getElementById("home_services")
  .addEventListener("click", homeservices, true);

document
  .getElementById("about_us_services")
  .addEventListener("click", aboutUsservices, true);

document
  .getElementById("Contact_us_services")
  .addEventListener("click", contactUsservices, true);

function homeservices() {
  var element = document.getElementById("rewearit_logo");
  window.scrollTo({
    top: element.offsetTop,
    behavior: "smooth",
  });
}

function aboutUsservices() {
  var element = document.getElementById("about_us_page");
  window.scrollTo({
    top: element.offsetTop,
    behavior: "smooth",
  });
}

function contactUsservices() {
  var element = document.getElementById("cta_page");
  window.scrollTo({
    top: element.offsetTop,
    behavior: "smooth",
  });
}

// Playing the official-video on hover
const video = document.getElementById("rewaerit_video");
var videoPos = [];
function checkPos() {
  var element = video;
  var rect = element.getBoundingClientRect();
  console.log(rect);
  var top = rect.top + window.pageYOffset;
  var bottom = rect.bottom + window.pageYOffset;
  if (videoPos) {
    videoPos.el = element;
    videoPos.top = top;
    videoPos.bottom = bottom;
  } else {
    element.addEventListener("loadeddata", function () {
      if (++loaded === video.length - 1) {
        requestAnimationFrame(checkPos);
      }
    });
    videoPos.push({
      el: element,
      top: top,
      bottom: bottom,
    });
  }
}
checkPos();

var scrollHandler = function () {
  var min = window.pageYOffset;
  var max = min + window.innerHeight;
  if (videoPos.top >= min && videoPos.top < max) {
    videoPos.el.play();
  }
  if (videoPos.bottom <= min || videoPos.top >= max) {
    videoPos.el.pause();
  }
};
window.addEventListener("scroll", scrollHandler, true);
window.addEventListener("resize", checkPos);

// Photowall implemented dynamically- (db & api)
window.onload = function () {
  isAuthenticated();
  getPhotoWall();
};

// creating divs dynamically
function arr(array) {
  for (var i = 0; i < array.length; i++) {
    var photo_wall_container = document.createElement("div");
    photo_wall_container.innerHTML = `<div class="photo_${i + 1}">
        <img src="${array[i]}" id="image${i + 1}">
      </div>`;
    document.getElementById("photo_wall_div").appendChild(photo_wall_container);
  }
}

// Axios HTTP request 
function getPhotoWall() {
  axios({
    method: "get",
    url: "http://127.0.0.1:3000/api/photo-wall",
  })
    .then(function (response) {
      arr(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
}
