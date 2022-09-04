//Time
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return days[day];
}

//Temp

function showTemp(response) {
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

  getCoord(response.data.coord);
}

// City

function findCity(apiCity) {
  let apiKey = "ca95aece5407f70771d3c2a89b07f94b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function submitForm(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  findCity(cityInput.value);
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ca95aece5407f70771d3c2a89b07f94b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function goNavi(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

//Forcast
function getCoord(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}
function displayForcast(response) {
  let forcast = response.data.daily;

  let forcastHTML = `<div class="row">`;

  let forcastEl = document.querySelector("#forcast");
  forcast.forEach(function (forcastDay, index) {
    if (index < 5) {
      forcastHTML =
        forcastHTML +
        `
  <tr>
    <td>${formatDay(forcastDay.dt)}</td>
    <td align="center">
      <img 
        src="http://openweathermap.org/img/wn/${
          forcastDay.weather[0].icon
        }@2x.png" 
        alt=""
        width=40>
    </td>
    <td align="right">
      <strong> ${Math.round(forcastDay.temp.max)}℃ </strong> /${Math.round(
          forcastDay.temp.min
        )}℃
    </td>
  </tr>`;
    }
  });

  forcastEl.innerHTML = forcastHTML;

  forcastHTML = forcastHTML + `</div>`;
}
let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", goNavi);

let now = new Date();

let currentDate = document.querySelector("#current-data");
currentDate.innerHTML = correctDate(now);

let searchCity = document.querySelector("#search-button");
searchCity.addEventListener("click", submitForm);

findCity("Kyiv");
