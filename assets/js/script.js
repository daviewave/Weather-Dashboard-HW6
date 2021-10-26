//DEPENDECIES
//to target/add the searched cities attributes
var $currentWeatherAttributes = $("#outline-current-weather");
//to target/add the forecast cards in the container one by one
var $forecastCards = $("#forecast-cards-container");

//DATA
//api key to gain access to weather api when requesting below
const APIKey = "ac5cdfbb230d2506d7a3adace9626884";
//variables that store the current day
var currentDate = moment().format("MMMM Do YYYY");
var currentYear = moment().format("YYYY");
var currentDay = moment().format("DD");
var currentMonth = moment().format("MM");

console.log(currentYear);
console.log(currentDay);
console.log(currentMonth);

var a = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=APIKey";
console.log(a);

//FUNCTIONS
function createCurrentWeatherdisplay() {}

//HELPER FUNCTIONS
function getCity() {}

function getCityTemperature() {}

function getCityHumidity() {}

function getCityWindSpeed() {}

function getCityUVindex() {}

function getTodaysDate() {}

function getIconBasedOnCurrentWeather() {}

function getColorOfUVindex() {}

//USER INTERACTIONS
