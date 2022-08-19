let now = new Date();

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

let currentDate = document.querySelector("#current-data");
currentDate.innerHTML = correctDate(now);

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
let searchCity = document.querySelector("#search-button");
searchCity.addEventListener("click", findCity);

//Temp

function showTemp(response) {
  event.preventDefault();
  let temp = Math.round(response.data.main.temp);
  let nowTemp = document.querySelector("#temp-now");
  nowTemp.innerHTML = `${temp}`;
}

function showTempCurrent(response) {
  event.preventDefault();
  let temp = Math.round(response.data.main.temp);
  let nowTemp = document.querySelector("#temp-now");
  nowTemp.innerHTML = `${temp}`;
  let newCity = document.querySelector("#city");
  newCity.innerHTML = `${response.data.name}`;
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

let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", goNavi);
