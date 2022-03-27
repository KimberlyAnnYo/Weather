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

function page() {
  function getWeather(cityName) {
    //get weather request from open weather
    let queryURL =
      "https://api.openweathermap.org/data.2.5/weatherq=" +
      cityName +
      "&appid=" +
      APIKey;
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
        currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png")
        currentPicEl.setAttribute("alt", response.data.weather[0].description);
        currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176f";
        currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
        currentWindEl.innerHTML = "Wind: " + response.data.main.wind + " MPH";

        // Get UV Index
        var lat = response.JSON.cord.lat;
        var lon = response.JSON.data.lon;
        var UVQurryURL = " https://api.openweathermap.org/data/2.5/uvi/forcast?lat=" + lat + "&lon" + lon + "&apid" + APIKey + "&cnt=1";
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

        
    });
  }
}
