//DEPENDECIES
//to target/add the searched cities attributes
var $currentWeatherAttributes = $("#current-weather-container");
//to target/add the forecast cards in the container one by one
var $forecastCards = $("#forecast-cards-container");

var searchCities = JSON.parse(localStorage.getItem("searchedCities"));
// console.log(searchCities);

var searchsArr = [];

//DATA
//api key to gain access to weather api when requesting below
const APIKey = "ac5cdfbb230d2506d7a3adace9626884";

//variables that store the current day
var currentYear = moment().format("YYYY");
var currentDay = moment().format("DD");
var currentMonth = moment().format("MM");

var searchedCities = [];

const iconURL = new Array();

// console.log(currentYear);
// console.log(currentDay);
// console.log(currentMonth);

//FUNCTIONS
function createCurrentWeatherdisplay() {}

//USER INTERACTIONS
//when user clicks save need to handle in a function

//returns a string of the name of the last city searched
function getCity() {
  if (searchCities === null) {
    return "NO CITY SEARCHED YET";
  } else {
    curCity = JSON.stringify(searchCities[0]);
    curCity = curCity.replace(/"/g, "");
    console.log(curCity);
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

var getInput = document.getElementById("search-button");

getInput.addEventListener("click", function (event) {
  event.preventDefault();

  //gets city to search based on input passed in
  var $input = $("#input");
  searchsArr.unshift($input.val());
  localStorage.setItem("searchedCities", JSON.stringify(searchsArr));
  const url = getAPIurl(getCity());

  //1. Sets city searched and current date
  console.log(getCity());
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
  });

  //

  // createcurrentWeatherHeader(currentCity, $currentWeatherAttributes);
});

