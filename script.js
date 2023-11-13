
//weather API base funcntionality
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("btn");
  const zipcodeInput = document.getElementById("zipCode");

  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
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



//This connects the city search btn to the map
var citySearchBtn = document.getElementById("citySearchBtn").addEventListener('click',function() {
  document.location.href = '#map';
})

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        }),
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

window.initAutocomplete = initAutocomplete;


