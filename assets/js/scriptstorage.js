var citySearch = document.querySelector("#pac-input");
var pastCitySearchBtn = document.querySelector("#pastCitySearchBtn");

function saveLastCity() {
  var city = {
    city: citySearch.value
  };
  localStorage.setItem("city", JSON.stringify(city)) || [];
}


var msgDiv = document.querySelector("#msg");
var cityInput = document.querySelector("#recentCity");

renderLastCity();

function displayMessage(type, message) {
msgDiv.textContent = message;
msgDiv.setAttribute("class", type);
}

function renderLastCity() {
  var city = localStorage.getItem("pac-input");
  if (city == "") {
   return;
  }

cityInput.textContent = city;
};

pastCitySearchBtn.addEventListener("click", function(event) {
  event.preventDefault();
  var city = cityInput.value;
  saveLastCity();

  if (city == "") {
    displayMessage("error", "City Search Needed");
  } else {
    displayMessage("success", "Recent Search Saved Here");
  renderLastCity();
  }
}); 




