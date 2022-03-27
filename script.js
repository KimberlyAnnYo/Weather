
function page() {
    // declar variables and grabbing elements from html
    var cityEl = document.getElementById("enter-city");
    var searchEl = document.getElementById("search-button");
    var clearEl = document.getElementById("clear-history");
    var nameEl = document.getElementById("city-name");
    var currentPicEl = document.getElementById("current-pic");
    var currentTempEl = document.getElementById("temperature");
    var currentHumidityEl = document.getElementById("humidity");
    var currentWindEl = document.getElementById("wind");
    var currentUvEl = document.getElementById("UV-index");
    var historyEl = document.getElementById("history");
    var fivedayEL = document.getElementById("fiveday");
    var todayEl = document.getElementById("today");
    var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    //unique API Key
    var APIKey = "8582006685026ce77e41f2399696a305";
    function getWeather(cityName) {
    //get weather request from open weather
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    axios.get(queryURL).then(function (response) {
      todayEl.classList.remove("d-none");
      //parse response to current weather
      var currentDate = new Date(response.data.dt * 1000);
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();
      nameEl.innerHTML =
        response.data.name + " (" + month + "/" + day + "/" + year + ") ";
        var weatherPic = response.data.weather[0].icon;
        currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
        currentPicEl.setAttribute("alt", response.data.weather[0].description);
        currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176f";
        currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
        currentWindEl.innerHTML = "Wind: " + response.data.main.wind + " MPH";

        // Get UV Index
        var lat = response.JSON.cord.lat;
        var lon = response.JSON.data.lon;
        var UVQurryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
        axios.get(UVQurryURL)
        .then(function (response) {
            var UVIndex = document.createElement("span");

            // when uv is low, green. when moderate, yellow. When high, red. 

            if (response.data[0].value <4 ) {
                UVIndex.setAttribute("class", "badge badge-sucess");
            } 
            else if (response.data[0].value <8) {
                UVIndex.setAttribute("class", "badge badge-warning");
            }
            else {
                UVIndex.setAttribute("class", "badge badge-danger");
            }
            console.log(response.data[0].value)
            UVIndex.innerHTML = response.data[0].value;
            currentUvEl.innerHTML = "UV Index: ";
            currentUvEl.appendChild(UVIndex);
        });
// 5 day forcast


let cityID = response.data.id;
                let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
                axios.get(forecastQueryURL)
                    .then(function (response) {
                        fivedayEl.classList.remove("d-none");
                        
                        //  Parse response to display forecast for next 5 days
                        const forecastEls = document.querySelectorAll(".forecast");
                        for (i = 0; i < forecastEls.length; i++) {
                            forecastEls[i].innerHTML = "";
                            const forecastIndex = i * 8 + 4;
                            const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                            const forecastDay = forecastDate.getDate();
                            const forecastMonth = forecastDate.getMonth() + 1;
                            const forecastYear = forecastDate.getFullYear();
                            const forecastDateEl = document.createElement("p");
                            forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                            forecastEls[i].append(forecastDateEl);


    // weather icon
    var forcastWeatherEl = document.createElement("img");
    forcastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
    forcastWeatherEl.setAttribute("alt", response.data.list[forcastIndex].main.temp) + " &#176f";
    forcastEl[i].appendChild(forcastWeatherEl);
    var forcastTempEl= document.createElement("p");
    forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
    forecastEls[i].append(forecastTempEl);
    const forecastHumidityEl = document.createElement("p");
    forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
    forecastEls[i].append(forecastHumidityEl);
}

})

    })
    .catch (function(error) {
        if ( error.response) {
            alert("enter a valid city.")
        }
    })
  }
  //history from local storage.
      // Get history from local storage if any
      searchEl.addEventListener("click", function () {
        getWeather(cityEl.value);
        searchHistory.push(cityEl.value);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        renderSearchHistory();
    })

    // Clear History button
    clearEl.addEventListener("click", function () {
        localStorage.clear();
        searchHistory = [];
        renderSearchHistory();
    })

    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }

    function renderSearchHistory() {
        historyEl.innerHTML = "";
        for (let i = 0; i < searchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click", function () {
                getWeather(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }

    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
}
}
page();