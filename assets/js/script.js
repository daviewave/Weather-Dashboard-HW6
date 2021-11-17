//DEPENDECIES
//to target/add the searched cities attributes
var $currentWeatherAttributes = $("#current-weather-container");
//to target/add the forecast cards in the container one by one
var $forecastCards = $("#forecast-cards-container");

var searchCities = JSON.parse(localStorage.getItem("searchedCities"));

var searchsArr = [];

//DATA
//api key to gain access to weather api when requesting below
const APIKey = "ac5cdfbb230d2506d7a3adace9626884";

//variables that store the current day
var currentYear = moment().format("YYYY");
var currentDay = moment().format("DD");
var currentMonth = moment().format("MM");

var searchedCities = [];

//FUNCTIONS

//USER INTERACTIONS

//returns a string of the name of the last city searched
function getCity() {
  if (searchsArr === null) {
    return "NO CITY SEARCHED YET";
  } else {
    curCity = JSON.stringify(searchsArr[0]);
    curCity = curCity.replace(/"/g, "");
    return curCity;
  }
}

function getCurDate() {
  return moment().format("MMMM Do YYYY");
}

function setCurrentCityAndDate(city, date) {
  var $cityAndDate = $("#cityAndDate");
  $cityAndDate.text(city + "  (" + date + ")  ");
}

//so I can get the rest of the stuff I need
function getAPIurl(city) {
  //Reaches out to API with url and key
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

  return queryURL;
}

function getUV_APIurl(lat, lon) {
  //Reaches out to API with url and key
  let uvURL =
    "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIKey +
    "&cnt=1";

  return uvURL;
}

function get5DayForecastURL(id) {
  //Reaches out to API with url and key
  let forecastQueryURL =
    "https://api.openweathermap.org/data/2.5/forecast?id=" +
    id +
    "&appid=" +
    APIKey;

  return forecastQueryURL;
}

function getIconBasedOnCurrentWeather(APIurl) {
  axios.get(APIurl).then(function (response) {
    const weatherIcon = response.data.weather[0].icon;
    const curIcon =
      "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    setIconBasedOnCurrentWeather(curIcon);
  });
}

function setIconBasedOnCurrentWeather(link) {
  let $currentWeatherIcon = $("#weatherIconImg");
  $currentWeatherIcon.attr("src", link);
}

function setTemp(temp) {
  let $currentTemp = $("#temperature");
  $currentTemp.text("Temperature: " + temp);
}

function setHumidity(humid) {
  let $currentHumid = $("#humidity");
  $currentHumid.text("Humidity: " + humid + "%");
}

function setWind(wind) {
  let $currentHumid = $("#wind-speed");
  $currentHumid.text("Wind Speed: " + wind + " MPH");
}

function setUV(uv) {
  let $currentHumid = $("#UV-index");
  $currentHumid.text("UV index: " + uv);
}

function k2f(K) {
  return Math.floor((K - 273.15) * 1.8 + 32);
}

var getInput = document.getElementById("search-button");

getInput.addEventListener("click", function (event) {
  event.preventDefault();

  //gets city to search based on input passed in
  var $input = $("#input");
  searchsArr.unshift($input.val());
  localStorage.setItem("searchedCities", JSON.stringify(searchsArr));

  updateSearchedCityWeather();
});

function updateSearchedCityWeather() {
  const url = getAPIurl(getCity());

  //1. Sets city searched and current date
  setCurrentCityAndDate(getCity(), getCurDate());

  //2.gets and sets weather icon
  axios.get(url).then(function (response) {
    const weatherIcon = response.data.weather[0].icon;
    const curIcon =
      "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    setIconBasedOnCurrentWeather(curIcon);

    const curTemp = response.data.main.temp;
    setTemp(curTemp);

    const curHumidity = response.data.main.humidity;
    setHumidity(curHumidity);

    const curWind = response.data.wind.speed;
    setWind(curWind);

    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    let uvURL = getUV_APIurl(lat, lon);
    axios.get(uvURL).then(function (response) {
      const curUV = response.data[0].value;
      setUV(curUV);
    });

    let forecast = response.data.id;
    let forecaseURL = get5DayForecastURL(forecast);
    axios.get(forecaseURL).then(function (response) {
      //  Parse response to display forecast for next 5 days
      const forecastDays = document.querySelectorAll(".forecast");
      for (i = 0; i < forecastDays.length; i++) {
        //forecast date
        forecastDays[i].innerHTML = "";
        const currentForecastDay = i * 8 + 4;

        const forecastDate = new Date(
          response.data.list[currentForecastDay].dt * 1000
        );
        const curForecastDay = forecastDate.getDate();
        const curForecastMonth = forecastDate.getMonth() + 1;
        const curForecastYear = forecastDate.getFullYear();
        const forecastDateElement = document.createElement("p");
        forecastDateElement.innerHTML =
          curForecastMonth + "/" + curForecastDay + "/" + curForecastYear;
        forecastDays[i].append(forecastDateElement);

        //forecast icon
        const forecastWeatherImg = document.createElement("img");
        forecastWeatherImg.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/" +
            response.data.list[currentForecastDay].weather[0].icon +
            "@2x.png"
        );
        forecastWeatherImg.setAttribute(
          "alt",
          response.data.list[currentForecastDay].weather[0].description
        );
        forecastDays[i].append(forecastWeatherImg);

        //forecast temp
        const forecastTemp = document.createElement("p");
        forecastTemp.innerHTML =
          "Temp: " +
          k2f(response.data.list[currentForecastDay].main.temp) +
          " &#176F";
        forecastDays[i].append(forecastTemp);

        //forecast humid
        const forecastHumidity = document.createElement("p");
        forecastHumidity.innerHTML =
          "Humidity: " +
          response.data.list[currentForecastDay].main.humidity +
          "%";
        forecastDays[i].append(forecastHumidity);
      }
    });
  });
}