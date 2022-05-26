// create function to call weather api based on search input
var getWeather = function (cityName) {
    var appId = "4c216875996a459c79598204a84ef721"
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + "&lon=" + "&exclude=minutely,hourly,alerts&appid=" + appId;

    fetch(apiURL).then(function (response) {
        console.log(response);
    });
};

// display weather data in html

// store city name to local storage

// display previous search history in html

// getWeather();