//weather API base functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("citySearchBtn");
  const locationInput = document.getElementById("pac-input");

  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    //This connects the city search btn to the map
    document.location.href = '#map';

    var apiKey = "a1c24f9ef9bb705299a22d8524be3474 ";

    const city = locationInput.value;
 
    
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
        const butfeelsLike = Math.round(1.8 * (data.main.feels_like - 273) + 32) ; //converts celvin to farenheit and rounds to nearest integer
        const currentDate = dayjs().format("MMMM D, YYYY"); // current date and time
        const windSpeed = data.wind.speed; //current windspeed
        const cityName = data.name;

        const imgCode = data.weather[0].icon; // The variable for the current weather image symbol
        const icon = document.createElement("img");
        icon.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${imgCode}@2x.png`


          
        );
        weatherWidget ("Temperature: " + temperature + " °F", "Humidity: " + humidity + " %", "Temp. feels like " + butfeelsLike + " °F", currentDate, "Wind Speed: " + windSpeed + " mph", imgCode, cityName);
        
      });
    });
});
// weatherWidget (temperature, humidity, butfeelsLike, currentDate, windSpeed, imgCode, cityName);
//This connects the city search btn to the map
// var citySearchBtn = document.getElementById("citySearchBtn").addEventListener('click',function() {
//   document.location.href = '#map';
// })

function weatherWidget (temperature, humidity, butfeelsLike, currentDate, windSpeed, imgCode, cityName) {
 
  const h2El = document.createElement ('h2')
  h2El.textContent = currentDate;
  console.log (h2El.textContent);
  h2El.style.fontFamily = 'Raleway, sans-serif';
  h2El.style.color = 'white';
  h2El.style.textAlign = 'center'
  h2El.style.fontSize ='40px'

  const h3El = document.createElement ('h3')
  h3El.textContent = "Current Weather Conditions in " + cityName;
  console.log(h3El.textContent)
  h3El.style.color = 'white';
  h3El.style.fontFamily = 'Raleway, sans-serif';
  h3El.style.textAlign = 'center';
  h3El.style.fontSize ='30px';
  h3El.style.width = '500px';


  const ulEl = document.createElement ('ul');
ulEl.style.textAlign = 'center';
  ulEl.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'; 
  ulEl.style.width = '275px';
  ulEl.style.borderRadius = '25px';
  ulEl.style.marginLeft = 'auto';
  ulEl.style.marginRight = 'auto';

  

  const pEl = document.createElement ('p');
  pEl.style.color = 'white';
  pEl.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'; 
  pEl.style.borderRadius = '25px';
  pEl.style.width = '435px';
  pEl.style.padding = '10px';
  pEl.style.position = 'absolute';
  pEl.style.left = '55px';
  pEl.style.top = '385px';
  pEl.style.paddingLeft = '150px';
  pEl.style.paddingBottom = '0';
 pEl.style.fontFamily = 'Raleway, sans-serif';
 pEl.style.fontSize = '16px';

  const weathercardCont = document.createElement ('div');
  weathercardCont.style.backgroundSize = 'cover'; // Adjust this property as needed
  weathercardCont.style.backgroundRepeat = 'no-repeat';
  weathercardCont.style.width = '550px';
  weathercardCont.style.height = '500px';
  weathercardCont.style.position = 'absolute';
  weathercardCont.style.left = '800px';
  weathercardCont.style.top = '1125px';
  weathercardCont.style.borderRadius = '25px';
  weathercardCont.style.border = '15px solid black'

  ifskiesShow( weathercardCont, imgCode, pEl, cityName );


  const weatherIcon = document.createElement ('img');
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${imgCode}@2x.png`
  );

  weatherIcon.style.position = 'absolute';
weatherIcon.style.top = '380px';
weatherIcon.style.left = '85px';

  const weatherConditions = [temperature,  butfeelsLike, humidity, windSpeed]

  for( let i = 0; i < weatherConditions.length; i++) {
    const liEl = document.createElement('li');
    liEl.textContent = weatherConditions[i];
    italicWord = weatherConditions[2];
    liEl.style.color = 'white';
    liEl.style.textAlign = 'center';
    liEl.style.fontSize = '24px';
    liEl.style.padding = '10px';
    liEl.style.fontFamily = 'Raleway, sans-serif';
 
    ulEl.appendChild(liEl);
    console.log(weatherConditions[i]);
  }



  weathercardCont.appendChild(h2El);
  weathercardCont.appendChild(h3El);

  weathercardCont.appendChild(ulEl);
weathercardCont.appendChild( pEl);


 
  weathercardCont.appendChild(weatherIcon);
  document.body.appendChild(weathercardCont);
}

function ifskiesShow(weathercardCont, imgCode, pEl, cityName) {
  if (imgCode === "13d" || imgCode === "13n") {
    weathercardCont.style.backgroundImage = 'url("weather-images/2735406.jpg")';
    pEl.textContent = "Currently in " + cityName + " it is snowing. Grab a drink and stay warm at a nearby brewery. "
  } else if (imgCode === "11d" || imgCode === "11n") {
    weathercardCont.style.backgroundImage = 'url("weather-images/thunderstorm.jpg")';
    pEl.textContent = "Currently in " + cityName + " there is a thunderstorm. Are you afraid? drink about it at a nearby brewery."
  } else if (imgCode === "09d" || imgCode === "09n") {
    weathercardCont.style.backgroundImage = 'url("weather-images/rain.jpg")';
    pEl.textContent = "Currently in " + cityName + " it is raining. Stay dry and grab a drink at a nearby brewery. "
  } else if (imgCode === "10d" || imgCode === "10n") {
    weathercardCont.style.backgroundImage = 'url("weather-images/rain.jpg")';
    pEl.textContent = "Currently in " + cityName + " it is raining. Stay dry and grab a drink at a nearby brewery. "
  } else if (imgCode === "50d" || imgCode === "50n") {
    weathercardCont.style.backgroundImage = 'url("weather-images/lowVisibility.avif")';
    pEl.textContent = "Currently in " + cityName + " there is low visibility or hazardous conditions. Stay safe at a nearby brewery. "
    // Visibility low
  } else if (imgCode === "01d" || imgCode === "01n") {
    weathercardCont.style.backgroundImage = 'url("weather-images/Clearskies.webp")';
    pEl.textContent = "Currently in " + cityName + " the skies are clear. Enjoy the clear skies and grab a drink at a brewery. "
  } else if (imgCode === "02d" || imgCode === "02n") {
    weathercardCont.style.backgroundImage = 'url("weather-images/Fewclouds.jpg")';
  } else if (imgCode === "03d" || imgCode === "03n") {
    weathercardCont.style.backgroundImage = 'url("weather-images/scatteredClouds.jpg")';
    pEl.textContent = "Currently in " + cityName + " there are scattered clouds. It's a perfect day to enjoy the indoors at a brewery. "
  } else if (imgCode === "04d" || imgCode === "04n") {
    weathercardCont.style.backgroundImage = 'url("weather-images/overcast.jpg")';
    pEl.textContent =  pEl.textContent = "Currently in " + cityName + " there is an overcast. It's a perfect day to be indoors and visit a brewery. "
  }
}

function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
}

const input = document.getElementById("pac-input");
const searchBox = new google.maps.places.SearchBox(input);

window.initAutocomplete = initAutocomplete;

