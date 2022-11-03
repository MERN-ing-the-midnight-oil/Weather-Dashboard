//Dom hooks for elements that will take input
var searcherEl = document.querySelector("#searcher");

//DOM hooks for elements that will display feedback
var forcastEl = document.querySelector("#forcast");

function handleSearcherSubmit(event) {
	//takes the submit event and does stuff with it
	var cityInput = document.querySelector("#searcher-input").value; ////gets the text (city) the user types in
	var rhysApiKey = "8efdcf6890084b049f69cd42d7792cd8";
	event.preventDefault();
	function getLatLon() {
		var latLonQueryUrl =
			"http://api.openweathermap.org/geo/1.0/direct?q=" +
			cityInput +
			",&appid=" +
			rhysApiKey;
		console.log(latLonQueryUrl);

		fetch(latLonQueryUrl)
        .then(function (response) {
			if (!response.ok) {
				throw response.json();
			}
		});
		return response.json(); //returns a javascript object that is rehydrated from json
	
        }
	    .then(function (coordinates) { //maybe this names the function response "coordinates"?
            console.log("the coordinates are "+coordinates);
	    }
	getLatLon(); //whats wrong with calling gtLatLon at this point?
}
searcherEl.addEventListener("submit", handleSearcherSubmit); // executes the above event handler function when a form submit happens

//maybe  do a .then(function
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
//var Key =      //API ke
