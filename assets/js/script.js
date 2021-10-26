//DEPENDECIES
//to target/add the searched cities attributes
var $currentWeatherAttributes = $("#current-weather-container");
//to target/add the forecast cards in the container one by one
var $forecastCards = $("#forecast-cards-container");

var searchCities = JSON.parse(localStorage.getItem("searchedCities"));
console.log(searchCities);

var searchsArr = [];

//DATA
//api key to gain access to weather api when requesting below
const APIKey = "ac5cdfbb230d2506d7a3adace9626884";
//variables that store the current day
var currentDate = moment().format("MMMM Do YYYY");
var currentYear = moment().format("YYYY");
var currentDay = moment().format("DD");
var currentMonth = moment().format("MM");

var searchedCities = [];

console.log(currentYear);
console.log(currentDay);
console.log(currentMonth);

//FUNCTIONS
function createCurrentWeatherdisplay() {}

function createcurrentWeatherHeader($curWeather) {
  var $currentWeatherHeader = $("<div>");
  $currentWeatherHeader.addClass("col-12");

  var $cityName = $("<h1>");
  $cityName.attr("id", "city-name-header");
  $cityName.text(getCity());
  console.log($cityName.text);

  var $currentWeatherIcon = $("<img>");

  $currentWeatherHeader.append($cityName);
  $currentWeatherHeader.append($currentWeatherIcon);

  $curWeather.append($currentWeatherHeader);
}

//HELPER FUNCTIONS
//returns a string of the name of the last city searched
function getCity() {
  if (searchCities === null) {
    return "NO CITY SEARCHED YET";
  } else {
    return searchCities[0];
  }
}

function getCityTemperature() {}

function getCityHumidity() {}

function getCityWindSpeed() {}

function getCityUVindex() {}

function getTodaysDate() {}

function getIconBasedOnCurrentWeather() {}

function getColorOfUVindex() {}

//USER INTERACTIONS
//when user clicks save need to handle in a function

var getInput = document.getElementById("search-button");

getInput.addEventListener("click", function (event) {
  event.preventDefault();

  var $input = $("#input");
  searchsArr.unshift($input.val());
  console.log(searchsArr);
  localStorage.setItem("searchedCities", JSON.stringify(searchsArr));
});

createcurrentWeatherHeader($currentWeatherAttributes);
