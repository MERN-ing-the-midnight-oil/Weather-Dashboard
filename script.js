//Dom hooks for elements that will take input
var searcherEl = document.querySelector("#searcher");

//DOM hooks for elements that will display feedback
var forcastEl = document.querySelector("#forcast");

var cities = [];

function handleSearcherSubmit(event) {
	//listening to submit event on the form
	var InputText = document.querySelector("#searcher-input").value; ////gets what the user types in
	event.preventDefault();
	console.log(InputText + " is the inputted text");

	// var Latitude = sets "Latitude" to the latitude of the city the user chose

	// var Longitude = sets "Longitude" to the longitude of the city the user chose
	//////////

	//////////
}

searcherEl.addEventListener("submit", handleSearcherSubmit); // executes the above event handler function when a form submit happens

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
