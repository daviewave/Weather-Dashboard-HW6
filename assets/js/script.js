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

// console.log(currentYear);
// console.log(currentDay);
// console.log(currentMonth);

//FUNCTIONS
function createCurrentWeatherdisplay() {}

// function createcurrentWeatherHeader(
//   city,
//   date,
//   weatherIcon,
//   temperature,
//   humidity,
//   windSpeed,
//   UVindex
// ) {
//   var $currentWeatherHeader = $("<div>");
//   $currentWeatherHeader.addClass("col-12");

//   var $currentWeatherIcon = $("<img>");

//   var $cityName = $("<h1>");
//   $cityName.attr("id", "city-name-header");
//   $cityName.text(city + " (" + currentDate + ") ");

//   $currentWeatherHeader.append($cityName);
//   $currentWeatherHeader.append($currentWeatherIcon);

//   $curWeather.append($currentWeatherHeader);
// }

//USER INTERACTIONS
//when user clicks save need to handle in a function

var getInput = document.getElementById("search-button");

getInput.addEventListener("click", function (event) {
  event.preventDefault();

  //gets city to search based on input passed in
  var $input = $("#input");
  searchsArr.unshift($input.val());
  localStorage.setItem("searchedCities", JSON.stringify(searchsArr));
  let currentCity = getCity();

  let curURL = getAPIurl(currentCity);
  let curDate = getCurDate();
  setCurrentCityAndDate(getCity(), getCurDate());


  // createcurrentWeatherHeader(currentCity, $currentWeatherAttributes);
});

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

function getCurDate(){
  return moment().format("MMMM Do YYYY");
}

function setCurrentCityAndDate(city, date) {
  var $cityAndDate = $("#cityAndDate");
  $cityAndDate.text(city +  "  (" + date + ")  ");
}

//so I can get the rest of the stuff I need
function getAPIurl(city) {
  //Reaches out to API with url and key
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  console.log(queryURL);

  return queryURL;
}

function getIconBasedOnCurrentWeather(APIurl){
  
  axios.get(APIurl)
    .then(function (response) {

    });
    return $currentWeatherIcon;
}

function getCityTemperature(APIurl) {}

function getCityHumidity(APIurl) {}

function getCityWindSpeed(APIurl) {}

function getCityUVindex(APIurl) {}

function getColorOfUVindex(APIurl) {}






// function getCurCityWeather(city) {
//   //uses created url string to call and get info
//   axios.get(queryURL).then(function (response) {
//     //1. get weather icon
//     let weatherIcon = response.data.weather[0].icon;
//     let curTemp = response.data.main.temp;
//     console.log(weatherIcon);
//     console.log(curTemp);
//   });
// }
// getCurCityWeather(getCity());