// get the button from the index file

var searchBtn = document.getElementById('search-btn');
var searchHistoryContainer = document.getElementById('search-history-container')

searchBtn.addEventListener('click', function (e) {
    e.preventDefault()
    var city = document.getElementById('cityname').value
    if (city === "") {
        return
    }
    getWeather(city)
    weatherHistory(city)
});

// create function to call weather api based on search input
function getWeather(cityName) {
    var appId = "4c216875996a459c79598204a84ef721"
    var apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + appId + "&units=imperial";

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var lat = data.coord.lat;
                var lon = data.coord.lon;

                var name = data.name;
                
                displayWeather(data);
                getForecast(lat, lon);

            })
        } else {
            alert("There was an issue, please try again");
        }
    });
};

// get 5 day forcaset
var getForecast = function (value1, value2) {
    var appId = "4c216875996a459c79598204a84ef721"
    apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + value1 + "&lon=" + value2 +"&APPID=" + appId;

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayWeather(data)
            })
        } else {
            alert("There was an issue, please try again");
        }
    });
};

// display weather data in html
function displayWeather(data) {
    console.log(data);
};

// store city name to local storage
function weatherHistory(city) {
    var storage = JSON.parse(localStorage.getItem('weatherHistory'))
    if (storage === null) {
        storage = []
    }
    storage.push(city)
    localStorage.setItem('weatherHistory', JSON.stringify(storage))
    showHistory()
}

// display previous search history in html
function showHistory() {
    var storage = JSON.parse(localStorage.getItem('weatherHistory'))
    if (storage === null) {
        var noStorage = document.createElement('h4')
        noStorage.textContent = 'No Search History'
        searchHistoryContainer.append(noStorage)
    } else {
        searchHistoryContainer.textContent = ""
        for (var i = 0; i < storage.length; i++) {
            var searchHistoryBtn = document.createElement('button')
            searchHistoryBtn.textContent = storage[i]
            searchHistoryContainer.append(searchHistoryBtn)

            searchHistoryBtn.addEventListener('click', function (event) {
                var clickedCity = event.target.textContent
                getWeather(clickedCity)
            })
        }
    }
}

showHistory()





