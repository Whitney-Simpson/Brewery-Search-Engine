//weather API base funcntionality
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("btn");
  const zipcodeInput = document.getElementById("zipCode");

  //This connects the city search btn to the map
  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.location.href = '#map';
    var apiKey = "a1c24f9ef9bb705299a22d8524be3474 ";

    const zipCode = zipcodeInput.value;

    // Make the API request to OpenWeatherMap's Geocoding API
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`;

    fetch(weatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        const temperature = Math.round(1.8 * (data.main.temp - 273) + 32); //converts celvin to farenheit and rounds to nearest integer
        const humidity = data.main.humidity; // humidity
        const butfeelsLike = Math.round(1.8 * (data.main.feels_like - 273) + 32); //converts celvin to farenheit and rounds to nearest integer
        const currentDate = dayjs().format("MM/DD"); // current date and time
        const windSpeed = data.wind.speed; //current windspeed

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



