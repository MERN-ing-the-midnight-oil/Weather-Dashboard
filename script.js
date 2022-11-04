//Dom hooks for elements that will take input
var searcherEl = document.querySelector("#searcher");

//DOM hooks for elements that will display feedback
var forcastEl = document.querySelector("#forcast");
var rhysApiKey = "8efdcf6890084b049f69cd42d7792cd8";

function handleSearcherSubmit(event) {
	event.preventDefault();
	//console.log("button clicks");
	//takes the submit event and does stuff with it
	var cityInput = document.querySelector("#searcher-input").value; ////gets the text (the city name) the user types in

	function getLatLon() {
		var latLonQueryUrl =
			"http://api.openweathermap.org/geo/1.0/direct?q=" +
			cityInput +
			"&appid=" +
			rhysApiKey;

		fetch(latLonQueryUrl)
			.then(function (response) {
				//waiting for fetch promise to resolve
				if (!response.ok) {
					throw response.json();
				}
				return response.json(); //rehydrates
			})
			.then(function (coordinates) {
				//coordinates is now an object
				//hopefully sets the response to a var called "coordinates"
				console.log(coordinates);
				var lat = coordinates[0].lat;
				var lon = coordinates[0].lon;
				console.log(lat, lon);
				getWeather(lat, lon); //passes lat and lon to the getWeather function
			});
	}
	getLatLon();
}

function getWeather(lat, lon) {
	//receives lat and lon as first and second thing passed
	var weatherQueryURL =
		"http://api.openweathermap.org/data/2.5/forecast?lat=" +
		lat +
		"&lon=" +
		lon +
		"&appid=" +
		rhysApiKey;

	fetch(weatherQueryURL)
		.then(function (response) {
			//waiting for fetch promise to resolve
			if (!response.ok) {
				throw response.json();
			}
			return response.json(); //rehydrates
		})
		.then(function (weather) {
			console.log(weather);
			putWeatherinDOM(weather); //passes the weather object to putWeatherinDOM
		});
}

function putWeatherinDOM(weatherstuff) {
	//receives the weather object and renames it just for fun
	var firstDayDate = weatherstuff.list[0].dt_txt; //use brackets to drill down on array, dot notation to drill down on objects
	forcastEl.append(firstDayDate);
}

searcherEl.addEventListener("submit", handleSearcherSubmit); // executes handleSearcherSubmit when a form submit happens to searcherEl

//Put in a function to update the DOM with query results

/////////////

//API call for lat and long exampl
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

//API call for weather format
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
