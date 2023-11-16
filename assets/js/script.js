//weather API base functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("citySearchBtn");
  const locationInput = document.getElementById("pac-input");

  // This connects the city search btn to the map
  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.location.href = "#map";
    var apiKey = "a1c24f9ef9bb705299a22d8524be3474 ";

    const city = locationInput.value;

    // Make the API request to OpenWeatherMap's Geocoding API
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(weatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const temperature = Math.round(1.8 * (data.main.temp - 273) + 32); //converts celvin to farenheit and rounds to nearest integer
        const humidity = data.main.humidity; // humidity
        const butfeelsLike = Math.round(
          1.8 * (data.main.feels_like - 273) + 32
        ); //converts celvin to farenheit and rounds to nearest integer
        const currentDate = dayjs().format("MMMM D, YYYY"); // current date and time
        const windSpeed = data.wind.speed; //current windspeed
        const cityName = data.name;

        const imgCode = data.weather[0].icon; // The variable for the current weather image symbol
        const icon = document.createElement("img");
        icon.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${imgCode}@2x.png`
        );
        weatherWidget(
          "Temperature: " + temperature + " °F",
          "Humidity: " + humidity + " %",
          "Temp. feels like " + butfeelsLike + " °F",
          currentDate,
          "Wind Speed: " + windSpeed + " mph",
          imgCode,
          cityName
        );
      });
  });
  locationInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchButton.click();
    }
  });
});
//the function creating the weather card using createElement and stylizing
function weatherWidget(
  temperature,
  humidity,
  butfeelsLike,
  currentDate,
  windSpeed,
  imgCode,
  cityName
) {
  const h2El = document.createElement("h2");
  h2El.textContent = currentDate;
  h2El.style.fontFamily = "Raleway, sans-serif";
  h2El.style.color = "white";
  h2El.style.textAlign = "center";
  h2El.style.fontSize = "40px";

  const h3El = document.createElement("h3");
  h3El.textContent = "Current Weather Conditions in " + cityName;
  h3El.style.color = "white";
  h3El.style.fontFamily = "Raleway, sans-serif";
  h3El.style.textAlign = "center";
  h3El.style.fontSize = "30px";
  h3El.style.width = "500px";

  const ulEl = document.createElement("ul");
  ulEl.style.textAlign = "center";
  ulEl.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  ulEl.style.width = "275px";
  ulEl.style.borderRadius = "25px";
  ulEl.style.marginLeft = "auto";
  ulEl.style.marginRight = "auto";

  const pEl = document.createElement("p");
  pEl.style.color = "white";
  pEl.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  pEl.style.borderRadius = "25px";
  pEl.style.width = "475px";
  pEl.style.padding = "10px";
  pEl.style.position = "absolute";
  pEl.style.left = "55px";
  pEl.style.top = "395px";
  pEl.style.paddingLeft = "150px";
  pEl.style.paddingBottom = "0";
  pEl.style.fontFamily = "Raleway, sans-serif";
  pEl.style.fontSize = "18px";

  const mapWeatherdata = document.getElementById("mapWeatherdata");

  const weathercardCont = document.createElement("div");
  weathercardCont.style.backgroundSize = "cover"; // Adjust this property as needed
  weathercardCont.style.backgroundRepeat = "no-repeat";
  weathercardCont.style.width = "550px";
  weathercardCont.style.height = "500px";
  weathercardCont.style.position = "relative";
  weathercardCont.style.margin = "75px";
  weathercardCont.style.borderRadius = "25px";
  weathercardCont.id = "weathercardElement";
  //commented out border currently
  // weathercardCont.style.border = "15px solid black";
  clearWeatherCard(weathercardCont);
  ifskiesShow(weathercardCont, imgCode, pEl, cityName);

  const weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${imgCode}@2x.png`
  );

  weatherIcon.style.position = "absolute";
  weatherIcon.style.top = "395px";
  weatherIcon.style.left = "85px";
  weatherIcon.style.width = "100px";

  const weatherConditions = [temperature, butfeelsLike, humidity, windSpeed];

  for (let i = 0; i < weatherConditions.length; i++) {
    const liEl = document.createElement("li");
    liEl.textContent = weatherConditions[i];
    liEl.style.color = "white";
    liEl.style.textAlign = "center";
    liEl.style.fontSize = "24px";
    liEl.style.padding = "10px";
    liEl.style.fontFamily = "Raleway, sans-serif";

    ulEl.appendChild(liEl);
  }

  weathercardCont.appendChild(h2El);
  weathercardCont.appendChild(h3El);

  weathercardCont.appendChild(ulEl);
  weathercardCont.appendChild(pEl);

  weathercardCont.appendChild(weatherIcon);
  mapWeatherdata.appendChild(weathercardCont);
};

// Function changing the background of the weather card per weather conditions
function ifskiesShow(weathercardCont, imgCode, pEl, cityName) {
  if (imgCode === "13d" || imgCode === "13n") {
    weathercardCont.style.backgroundImage =
      'url("assets/Images/weather-images/snow.jpg")';
    pEl.textContent =
      "Currently in " +
      cityName +
      " it is snowing. Grab a drink and stay warm at a nearby brewery. ";
  } else if (imgCode === "11d" || imgCode === "11n") {
    weathercardCont.style.backgroundImage =
      'url("assets/Images/weather-images/thunderStorm.jpg")';
    pEl.textContent =
      "Currently in " +
      cityName +
      " there is a thunderstorm. Are you afraid? drink about it at a nearby brewery.";
  } else if (imgCode === "09d" || imgCode === "09n") {
    weathercardCont.style.backgroundImage =
      'url("assets/Images/weather-images/rainyCity.jpg")';
    pEl.textContent =
      "Currently in " +
      cityName +
      " it is raining. Stay dry and grab a drink at a nearby brewery. ";
  } else if (imgCode === "10d" || imgCode === "10n") {
    weathercardCont.style.backgroundImage =
      'url("assets/Images/weather-images/rainyCity.jpg")';
    pEl.textContent =
      "Currently in " +
      cityName +
      " it is raining. Stay dry and grab a drink at a nearby brewery. ";
  } else if (imgCode === "50d" || imgCode === "50n") {
    weathercardCont.style.backgroundImage =
      'url("assets/Images/weather-images/notVisible.jpg")';
    pEl.textContent =
      "Currently in " +
      cityName +
      " there is low visibility or hazardous conditions. Stay safe at a nearby brewery. ";
    // Visibility low
  } else if (imgCode === "01d" || imgCode === "01n") {
    weathercardCont.style.backgroundImage =
      'url("assets/Images/weather-images/clearSkies.jpg")';
    pEl.textContent =
      "Currently in " +
      cityName +
      " the skies are clear. Enjoy the clear skies and grab a drink at a brewery. ";
  } else if (imgCode === "02d" || imgCode === "02n") {
    weathercardCont.style.backgroundImage =
      'url("assets/Images/weather-images/aFewclouds.jpg")';
    pEl.textContent =
      "Currently in " +
      cityName +
      " there are a few clouds. It's a perfect day to enjoy the indoors at a brewery. ";
  } else if (imgCode === "03d" || imgCode === "03n") {
    weathercardCont.style.backgroundImage =
      'url("assets/Images/weather-images/scatteredClouds.jpg")';
    pEl.textContent =
      "Currently in " +
      cityName +
      " there are scattered clouds. It's a perfect day to enjoy the indoors at a brewery. ";
  } else if (imgCode === "04d" || imgCode === "04n") {
    weathercardCont.style.backgroundImage =
      'url("assets/Images/weather-images/overCast.jpg")';
    pEl.textContent = pEl.textContent =
      "Currently in " +
      cityName +
      " there is an overcast. It's a perfect day to be indoors and visit a brewery. ";
  }
};

//function preventing stacking bug of cards upon click
function clearWeatherCard(weathercardCont) {
  const existingWeatherCard = document.getElementById("weathercardElement");

  if (existingWeatherCard) {
    // .remove removes the element to prevent stacking on click
    existingWeatherCard.remove();
  }
};
