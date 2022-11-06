//Dom hooks for elements that will take input
var searcherEl = document.querySelector("#searcher");
var cardContainerEl = document.querySelector(".cardContainer");
//DOM hooks for elements that will display feedback
var todayEl = document.querySelector(".today");
var tomorrowEl = document.querySelector("#tomorrow");
var dayThreeEl = document.querySelector("#dayThree");
var dayFourEl = document.querySelector("#dayFour");
var dayFiveEl = document.querySelector("#dayFive");

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
	//receives lat and lon as first and second things passed
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
	//receives the weather object as an argument (renaming it is optional)
	for (let i = 0; i < 35; i = i + 8) {
		var city = weatherstuff.city.name;
		var date = weatherstuff.list[i].dt_txt;
		var tempK = weatherstuff.list[i].main.temp;
		var tempF = (tempK - 273.15) * (9 / 5) + 32;
		var wind = weatherstuff.list[i].wind.speed;
		var humidity = weatherstuff.list[i].main.humidity;
		var cardDiv = document.createElement("div");
		cardDiv.classList.add("individualCard"); //trhying this out

		var lineOne = document.createElement("p");
		lineOne.innerHTML = date;
		var lineTwo = document.createElement("p");
		lineTwo.innerHTML = "Temperature: " + Math.round(tempF) + " (Farenheit)";
		var lineThree = document.createElement("p");
		lineThree.innerHTML = "Wind Speed: " + wind + "MPH";
		var lineFour = document.createElement("p");
		lineFour.innerHTML = "Humidity: " + humidity + "%";
		cardDiv.appendChild(lineOne);
		cardDiv.appendChild(lineTwo);
		cardDiv.appendChild(lineThree);
		cardDiv.appendChild(lineFour);
		cardContainerEl.appendChild(cardDiv);
	}
}
searcherEl.addEventListener("submit", handleSearcherSubmit); // executes handleSearcherSubmit when a form submit happens to searcherEl
//cardDiv.classList.add("individualCard");
