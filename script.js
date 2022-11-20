//Dom hooks for elements that will take input
var searcherEl = document.querySelector("#searcher");
var cardContainerEl = document.querySelector(".cardContainer");
var todayContainerEl = document.querySelector(".todayContainer");
//var cityButtonsEl = document.querySelector("")
//DOM hooks for elements that will display feedback
var todayEl = document.querySelector(".today");
var tomorrowEl = document.querySelector("#tomorrow");
var dayThreeEl = document.querySelector("#dayThree");
var dayFourEl = document.querySelector("#dayFour");
var dayFiveEl = document.querySelector("#dayFive");
//misc vars
var rhysApiKey = "8efdcf6890084b049f69cd42d7792cd8";
var scriptArray = []


function handleSearcherSubmit(event) { //This needs to somehow listen for a submit from the form called "searcher" in the HTML
	event.preventDefault();
	var cityInput = document.querySelector("#searcher-input").value; 
	console.log("the city input submitted is: " + cityInput);
	getLatLon(cityInput);//when the user submits a city , send the city to getLatLon
}

function getLatLon(cityInput) {
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
				console.log(response);
				return response.json(); //rehydrates
			})

			.then(function (coordinates) {	
				//coordinates is now an object
				//hopefully sets the response to a var called "coordinates"
				console.log(coordinates+" is the coordinates object returned from the server");
				var lat = coordinates[0].lat;
				var lon = coordinates[0].lon;
				if (lat === undefined || lon === undefined ) {//if either lat or lon is undefined
					alert("the city name you chose isn't resulting in any coordinates");//then alert
					console.log("'the city name you chose isn't resulting in any coordinates'should have just appeared as an alert");
				} else {			
				updateOrCreateStorage(cityInput);//puts the successful city name into the storage array
				getToday(lat, lon); //passes lat and lon to the getToday function
				getWeather(lat, lon); //passes lat and lon to the getWeather function}
				console.log("in the promise, the lat and lon are: " + lat, lon);
			}
			
			});
	}

function updateOrCreateStorage(cityInput){//run this whenever user submits. makes an array called scriptArray and a local storage array and updates them .
	var scriptArray = JSON.parse(localStorage.getItem("storageArray")); //gets whatever might be in local storage and assignes it to var scriptArray
	if(scriptArray == null) {//if scriptArray is null because nothing was presently in storageArray , 
		var scriptArray = [cityInput];//go ahead and fill scriptArray from the most recent user input instead.
		localStorage.setItem("storageArray", JSON.stringify(scriptArray));//and then also store it in local storage for next time.
	} else{
		scriptArray.unshift(cityInput);//if there already is something in local storage, grab that for the script array
		localStorage.setItem("storageArray", JSON.stringify(scriptArray));	
	}
}


	
	//make a button, get the city name for the button from local storage
//event listener on a button container
	//if it gets a click, collect the city name from the button. 


	//call the button builder function






function getToday(lat, lon) {
	console.log("the lat and lon are at this point: " + lat, lon);
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
				throw response.json();//TODO something should alert if garbage is given
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
	todayContainerEl.innerHTML = ""; //clears previous weather reports
	var city = todaysStuff.name;
	var date = moment().format("MMM Do YY"); 
	console.log(date+" . is the moment as mm do yy");
	var tempK = todaysStuff.main.temp;
	var tempF = (tempK - 273.15) * (9 / 5) + 32;
	var wind = todaysStuff.wind.speed;
	var humidity = todaysStuff.main.humidity;
	var cardDiv = document.createElement("div");

	var lineZero = document.createElement("div");
	lineZero.innerHTML = city+" is today's city";//why isn't this showing up

	var lineOne = document.createElement("div");
	lineOne.innerHTML = date+" is today's date";//when this one IS showing up?

	var lineTwo = document.createElement("div");
	lineZero.innerHTML = "Temperature: " + Math.round(tempF) + " (Farenheit)";

	var lineThree = document.createElement("div");
	lineThree.innerHTML = "Wind Speed: " + wind + "MPH";

	var lineFour = document.createElement("div");
	lineFour.innerHTML = "Humidity: " + humidity + "%";

	cardDiv.appendChild(lineZero); //These five lines append the five weather stats to cardDiv...
	cardDiv.appendChild(lineOne);
	cardDiv.appendChild(lineTwo);
	cardDiv.appendChild(lineThree);
	cardDiv.appendChild(lineFour);
	todayContainerEl.appendChild(cardDiv); //... and this appends cardDiv to the cardContainerEl
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
		//lineZero.innerHTML = cityInput; //city?

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
