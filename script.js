//weather API base functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("weatherButton");
  const locationInput = document.getElementById("pac-input");

  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    var apiKey = "a1c24f9ef9bb705299a22d8524be3474 ";

    const city = locationInput.value;
    weatherWidget (temperature, humidity, butfeelsLike, currentDate, windSpeed, imgCode, cityName);
    
    // Make the API request to OpenWeatherMap's Geocoding API
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    console.log(weatherUrl)

    fetch(weatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        const temperature = Math.round(1.8 * (data.main.temp - 273) + 32); //converts celvin to farenheit and rounds to nearest integer
        const humidity = data.main.humidity; // humidity
        const butfeelsLike = Math.round(1.8 * (data.main.feels_like - 273) + 32); //converts celvin to farenheit and rounds to nearest integer
        const currentDate = dayjs().format("MM/DD"); // current date and time
        const windSpeed = data.wind.speed; //current windspeed
        const cityName = data.name;

        const imgCode = data.weather[0].icon; // The variable for the current weather image symbol
        const icon = document.createElement("img");
        icon.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${imgCode}@2x.png`
        );

        console.log(data);
      });
  });
});

//This connects the city search btn to the map
var citySearchBtn = document.getElementById("citySearchBtn").addEventListener('click',function() {
  document.location.href = '#map';
})

function weatherWidget (temperature, humidity, butfeelsLike, currentDate, windSpeed, imgCode, cityName) {
 
  const ulEl = document.createElement ('ul');

  const h2El = document.createElement ('h2)')
  h2El.textContent = cityName;

  const h3El = document.createElement ('h3')
  h3El.textContent = currentDate;

  const weathercardCont = document.createElement ('div');

  const weatherIcon = document.createElement ('img');
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${imgCode}@2x.png`
  );

  const weatherConditions = [temperature, humidity, butfeelsLike, windSpeed]
  for( let i = 0; i < weatherConditions.length; i++) {
    const liEl = document.createElement('li');
    liEl.textContent = weatherConditions[i];
    ulEl.appendChild(liEl);
    console.log([i]);
  }
  weathercardCont.appendChild(ulEl);
  weathercardCont.appendChild(h2El);
  weathercardCont.appendChild(h3El);
  weathercardCont.appendChild(weatherIcon);
  document.body.appendChild(weathercardCont);
}
