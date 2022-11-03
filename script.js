//Dom hooks for elements that will take input
var searcherEl = document.querySelector("#searcher");

//DOM hooks for elements that will display feedback
var forcastEl = document.querySelector("#forcast");



function handleSearcherSubmit(event) {
	//listening to submit event on the form
	var cityInput = document.querySelector("#searcher-input").value; ////gets what the user types in
	event.preventDefault();
	console.log(cityInput + " is the inputted text");
}
searcherEl.addEventListener("submit", handleSearcherSubmit); // executes the above event handler function when a form submit happens

var openWeatherKey = "8efdcf6890084b049f69cd42d7792cd8"

function getLatLon(){} //Does this work yet?
    latLonQueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+cityInput+",&limit=5&appid="+openWeatherKey

fetch(latLonQueryUrl)//maybe this works now?
.then(function (response) {
    if (!response.ok) {
        throw response.json(); //throw error
    }
    return response.json();
//maybe do a .then(function 
//then update the DOM 



//Put in a function to update the DOM with query results

/////////////

//API call for lat and long exampl
//Example of API call

// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
//API call for weather format
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//var lat =
//var lon =
//var Key =      //API key
