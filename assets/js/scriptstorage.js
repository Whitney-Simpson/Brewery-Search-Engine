var citySearch = document.querySelector("#pac-input");
var pastCitySearchBtn = document.querySelector("#pastCitySearchBtn");


var msgDiv = document.querySelector("#msg");
var cityInput = document.querySelector("#recentCity");

renderLastCity();

function displayMessage(type, message) {
msgDiv.textContent = message;
msgDiv.setAttribute("class", type);
}

function renderLastCity() {
  var city = localStorage.getItem("city");
  if (city == "") {
   return;
  }

cityInput.textContent = city;
};

pastCitySearchBtn.addEventListener("click", function(event) {
  event.preventDefault();
  var city = cityInput.value;


  if (city == "") {
    displayMessage("error", "City Search Needed");
  } else {
    displayMessage("success", "Recent Search Saved Here");
  renderLastCity();
  }
}); 




