document.addEventListener("DOMContentLoaded", function() {
    const theDate = document.getElementById("currentDate");

    // Assuming you have the rest of your code here.

    const searchButton = document.getElementById("btn");
    const locationInput = document.getElementById("location");

    searchButton.addEventListener("click", function(event) {
        event.preventDefault();
        var apiKey = "a1c24f9ef9bb705299a22d8524be3474";
        const location = locationInput.value;

        // Make the API request to OpenWeatherMap's Geocoding API
        const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q='${location}'&limit=50&appid=${apiKey}`;

        fetch(geocodingUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                var latitude = data[0].lat;
                var longitude = data[0].lon;
                console.log(longitude);

                const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
                console.log(weatherURL);

                // Continue with the API request for weather data
                return fetch(weatherURL);
            });

       
    });
});