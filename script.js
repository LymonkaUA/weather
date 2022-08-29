function correctDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sathurday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

// City
function findCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let newCity = document.querySelector("#city");
  let apiCity = city.value;
  newCity.innerHTML = `${apiCity}`;

  let apiKey = "ca95aece5407f70771d3c2a89b07f94b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

//Temp

function showTemp(response) {
  let nowDescription = document.querySelector("#description");
  let nowTempCels = document.querySelector("#temp-now");
  let nowHumidity = document.querySelector("#humidity");
  let nowUVIndex = document.querySelector("#UV-Index");
  let nowWind = document.querySelector("#wind");
  let nowIcon = document.querySelector("#icon");

  tempC = response.data.main.temp;

  nowDescription.innerHTML = response.data.weather[0].description;
  nowTempCels.innerHTML = Math.round(tempC);
  nowHumidity.innerHTML = response.data.main.humidity;
  nowWind.innerHTML = Math.round(response.data.wind.speed);
  nowIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  nowIcon.setAttribute("alt", response.data.weather[0].description);
}

function showTempCurrent(response) {
  let nowDescription = document.querySelector("#description");
  let nowTempCels = document.querySelector("#temp-now");
  let nowHumidity = document.querySelector("#humidity");
  let nowUVIndex = document.querySelector("#UV-Index");
  let nowWind = document.querySelector("#wind");
  let nowIcon = document.querySelector("#icon");
  let nowCity = document.querySelector("#city");

  tempC = response.data.main.temp;

  nowDescription.innerHTML = response.data.weather[0].description;
  nowTempCels.innerHTML = Math.round(tempC);
  nowHumidity.innerHTML = response.data.main.humidity;
  nowWind.innerHTML = Math.round(response.data.wind.speed);
  nowIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  nowIcon.setAttribute("alt", response.data.weather[0].description);
  nowCity.innerHTML = response.data.name;
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ca95aece5407f70771d3c2a89b07f94b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTempCurrent);
}

function goNavi(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

// Unit conversion
function convertToFahrenheit(event) {
  event.preventDefault();
  let nowTempF = Math.round((tempC * 9) / 5 + 32);
  let tempEl = document.querySelector("#temp-now");
  tempEl.innerHTML = nowTempF;
}

let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", goNavi);

let now = new Date();

let currentDate = document.querySelector("#current-data");
currentDate.innerHTML = correctDate(now);

let searchCity = document.querySelector("#search-button");
searchCity.addEventListener("click", findCity);

let tempC = null;
let fBatton = document.querySelector("#fahrenheit");
fBatton.addEventListener("click", convertToFahrenheit);

findCity(Kyiv);
