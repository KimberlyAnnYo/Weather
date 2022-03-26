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
        currentPicEl.setAttribute
    });
  }
}
