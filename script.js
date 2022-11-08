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

//function to build the buttons will go here

function handleSearcherSubmit(event) {
	event.preventDefault();
	//console.log("button clicks");
	//takes the submit event and does stuff with it
	var cityInput = document.querySelector("#searcher-input").value; ////gets the text (the city name) the user types in
	//put something here to check in local storage, if null, add a new city, if cityInput is already existing, do nothing
	//put something here to store the city name.  local storage will have only one key and value , value will be an array
	//call the button builder function

	function getLatLon() {
		var latLonQueryUrl =
			"https://api.openweathermap.org/geo/1.0/direct?q=" +
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
				//console.log(lat, lon);
				getToday(lat, lon); //passes lat and lon to the getToday function
				getWeather(lat, lon); //passes lat and lon to the getWeather function
			});
	}
	getLatLon();
	console.log(lat);
}
function getToday(lat, lon) {
	console.log(lat, lon);
	var todayQueryURL =
		"https://api.openweathermap.org/data/2.5/weather?lat=" +
		lat +
		"&lon=" +
		lon +
		"&appid=" +
		rhysApiKey;
	console.log(todayQueryURL);
	fetch(todayQueryURL)
		.then(function (response) {
			//waiting for fetch promise to resolve
			if (!response.ok) {
				throw response.json();
			}
			return response.json(); //rehydrates
		})
		.then(function (weather1) {
			console.log(weather1);
			putTodayinDOM(weather1); //passes the weather object to putTodayinDOM
		});
}
getToday(); //call the function

//name, date, temperature, wind, humidity,for putTodayinDOM
function putTodayinDOM(todaysStuff) {
	cardContainerEl.innerHTML = ""; //clears previous weather reports
	var city = todaysStuff.name;
	var date = moment();
	var tempK = todaysStuff.main.temp;
	var tempF = (tempK - 273.15) * (9 / 5) + 32;
	var wind = todaysStuff.wind.speed;
	var humidity = todaysStuff.main.humidity;
	var cardDiv = document.createElement("div");
	var lineZero = document.createElement("div");
	lineZero.innerHTML = city;
	var lineOne = document.createElement("div");
	lineZero.innerHTML = date;
	var lineTwo = document.createElement("div");
	lineZero.innerHTML = "Temperature: " + Math.round(tempF) + " (Farenheit)";
	var lineThree = document.createElement("div");
	lineZero.innerHTML = "Wind Speed: " + wind + "MPH";
	var lineFour = document.createElement("div");
	lineZero.innerHTML = "Humidity: " + humidity + "%";
	cardDiv.appendChild(lineZero); //These five lines append the five weather stats to cardDiv...
	cardDiv.appendChild(lineOne);
	cardDiv.appendChild(lineTwo);
	cardDiv.appendChild(lineThree);
	cardDiv.appendChild(lineFour);
	cardContainerEl.appendChild(cardDiv); //... and this appends cardDiv to the cardContainerEl
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
cardContainerEl.innerHTML = ""; //clears previous weather reports
function putWeatherinDOM(weatherstuff) {
	//cardContainerEl.innerHTML = ""; //clears previous weather reports
	for (let i = 0; i < 35; i = i + 8) {
		var city = weatherstuff.city.name;
		var date = weatherstuff.list[i].dt_txt;
		var tempK = weatherstuff.list[i].main.temp;
		var tempF = (tempK - 273.15) * (9 / 5) + 32;
		var wind = weatherstuff.list[i].wind.speed;
		var humidity = weatherstuff.list[i].main.humidity;
		var cardDiv = document.createElement("div");
		cardDiv.classList.add("individualCard"); //trhying this out

		var lineZero = document.createElement("div");
		lineZero.innerHTML = city;
		var lineOne = document.createElement("div");
		lineOne.innerHTML = date;
		var lineTwo = document.createElement("div");
		lineTwo.innerHTML = "Temperature: " + Math.round(tempF) + " (Farenheit)";
		var lineThree = document.createElement("div");
		lineThree.innerHTML = "Wind Speed: " + wind + "MPH";
		var lineFour = document.createElement("div");
		lineFour.innerHTML = "Humidity: " + humidity + "%";
		cardDiv.appendChild(lineZero); //These five lines append the five weather stats to cardDiv...
		cardDiv.appendChild(lineOne);
		cardDiv.appendChild(lineTwo);
		cardDiv.appendChild(lineThree);
		cardDiv.appendChild(lineFour);
		cardContainerEl.appendChild(cardDiv); //... and this appends cardDiv to the cardContainerEl
	}
}
searcherEl.addEventListener("submit", handleSearcherSubmit); // executes handleSearcherSubmit when a form submit happens to searcherEl
//cardDiv.classList.add("individualCard");
//	buttonContainer.innerHTML = ""; //This gets rid of the previous question if one is there so only one question displays at once

//Adding data to local storage/////// from day scheduler app
// 	var textvalue = $(this).siblings(".textarea").val(); //textvalue gets the value of the sibling with textarea class
// 	var key = $(this).siblings(".textarea").attr("id"); // key gets the specific id of the textarea that is a sibling of "this" (this being the button that was clicked on)
// 	localStorage.setItem(key, textvalue); //local storage gets the var key and the var textvalue as the key value pair
// 	//put a "key" and a "value " into local storage
// 	// key =(Btn to textarea to textarea ID)
// });

//use localStorage.getitem
//use json to parse the array
//var will get the array
//use the array values to populate the buttons
