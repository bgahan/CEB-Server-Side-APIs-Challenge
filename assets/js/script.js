// get the button from the index file
var searchBtn = document.getElementById('search-btn');
var searchHistoryContainer = document.getElementById('search-history-container')
var currentWeather = document.getElementById('current-weather')

searchBtn.addEventListener('click', function (e) {
    e.preventDefault()
    var city = document.getElementById('cityname').value
    if (city === "") {
        return
    }
    getWeather(city)
    //weatherHistory(city)
});

// create function to call weather api based on search input
function getWeather(cityName) {
    var appId = "4c216875996a459c79598204a84ef721"
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + appId + "&units=imperial";

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)

                var lat = data.coord.lat;
                var lon = data.coord.lon;

                var name = data.name

                document.getElementById('city-name').textContent = data.name;

                var currentDate = moment().format('M/DD/YYYY');
                document.getElementById('date').textContent = currentDate;

                var iconImage = document.getElementById('icon')
                iconImage.setAttribute('src', iconUrl + data.weather[0].icon + '.png')

                document.getElementById('temp').textContent = 'Temp: ' + data.main.temp + ' °F';

                document.getElementById('wind').textContent = 'Wind: ' + data.wind.speed + ' MPH'

                document.getElementById('humidity').textContent = 'Humidity: ' + data.main.humidity + " %";

                weatherHistory(name);

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
    apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + value1 + "&lon=" + value2 + "&APPID=" + appId + "&units=imperial";

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

var fiveDayContainer = document.getElementById('forecast-weather')

var iconUrl = 'https://openweathermap.org/img/wn/'

// display weather data in html
function displayWeather(data) {

    var uvi = data.daily[0].uvi

    var uvIndex = document.getElementById('uvi')
    uvIndex.textContent = 'UV Index: ' + uvi;

    if (uvi <= 2) {
        uvIndex.classList.add('favorable');
        uvIndex.classList.remove('moderate');
        uvIndex.classList.remove('severe');
    } else if (uvi > 2 && uvi <= 7) {
        uvIndex.classList.add('moderate');
        uvIndex.classList.remove('favorable');
        uvIndex.classList.remove('severe');
    } else {
        uvIndex.classList.add('severe');
    }

    fiveDayContainer.textContent = ''
    console.log(data);
    for (var i = 1; i < 6; i++) {
        var card = document.createElement('div')
        fiveDayContainer.append(card)

        var forecastDate = moment().add(i + 1, 'days').format('M/DD/YYYY');
        
        var date5 = document.createElement('h3')
        date5.textContent = forecastDate
        card.append(date5)

        var iconImg = document.createElement('img')
        iconImg.setAttribute('src', iconUrl + data.daily[i].weather[0].icon + '.png')
        card.append(iconImg)

        var temp5 = document.createElement('p')
        temp5.textContent = 'Temp: ' + data.daily[i].temp.day + ' °F'
        card.append(temp5)

        var wind5 = document.createElement('p')
        wind5.textContent = 'Wind: ' + data.daily[i].wind_speed + ' MPH'
        card.append(wind5)

        var humidity5 = document.createElement('p')
        humidity5.textContent = 'Humidity: ' + data.daily[i].humidity + ' %'
        card.append(humidity5)
    }
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





