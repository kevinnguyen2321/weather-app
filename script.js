//DOM Elements//
const cityHeader = document.querySelector('.city-header');
const currentTemp = document.querySelector('.current-temp');
const conditonText = document.querySelector('.condition-text');
const currentConditionIcon = document.querySelector('.current-day-icon');
const foreCastDaysArr = document.querySelectorAll('.days');
const dateContainerArr = document.querySelectorAll('.date-container');
const minMaxArr = document.querySelectorAll('.max-min');
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.getElementById('search');
const unitBtn = document.getElementById('unit');
const foreCastDaysContainers = document.querySelectorAll('.day-icon');
const form = document.querySelector('form');
const body = document.querySelector('body');
//Current weather object returned by function//
let currentWeatherInfo;
//Get weather async funciton//
async function getWeather(location) {
  try {
    const forecastResponse = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=c8924334cfb94f5498e165605242003&q=${location}&days=3`,
      {
        mode: 'cors',
      }
    );
    const forecastData = await forecastResponse.json();

    getJsonData(forecastData);
  } catch (err) {
    console.log(err);
    alert('Error please try again');
  }
}
// //Function invocation//
getWeather('Berlin');
//Grabbing the JSON data//
function getJsonData(forecast) {
  const weatherInfo = {
    city: forecast.location.name,
    fahrenheitTemp: forecast.current.temp_f,
    celciusTemp: forecast.current.temp_c,
    conditionText: forecast.current.condition.text,
    forecastDays: [
      {
        date: forecast.forecast.forecastday[0].date,
        conditionText: forecast.forecast.forecastday[0].day.condition.text,
        maxTempFaren: forecast.forecast.forecastday[0].day.maxtemp_f,
        minTempFaren: forecast.forecast.forecastday[0].day.mintemp_f,
        maxTempCels: forecast.forecast.forecastday[0].day.maxtemp_c,
        minTempCels: forecast.forecast.forecastday[0].day.mintemp_c,
      },
      {
        date: forecast.forecast.forecastday[1].date,
        conditionText: forecast.forecast.forecastday[1].day.condition.text,
        maxTempFaren: forecast.forecast.forecastday[1].day.maxtemp_f,
        minTempFaren: forecast.forecast.forecastday[1].day.mintemp_f,
        maxTempCels: forecast.forecast.forecastday[1].day.maxtemp_c,
        minTempCels: forecast.forecast.forecastday[1].day.mintemp_c,
      },
      {
        date: forecast.forecast.forecastday[2].date,
        conditionText: forecast.forecast.forecastday[2].day.condition.text,
        maxTempFaren: forecast.forecast.forecastday[2].day.maxtemp_f,
        minTempFaren: forecast.forecast.forecastday[2].day.mintemp_f,
        maxTempCels: forecast.forecast.forecastday[2].day.maxtemp_c,
        minTempCels: forecast.forecast.forecastday[2].day.mintemp_c,
      },
    ],
  };

  displayData(weatherInfo);
  displayWeatherIcon(weatherInfo.conditionText, currentConditionIcon);
  setBackgroundColor(weatherInfo.conditionText);
  currentWeatherInfo = weatherInfo;

  return weatherInfo;
}
//Function to display data onto DOM//
function displayData(obj) {
  if (unitBtn.textContent === '°F') {
    currentTemp.textContent = Math.round(obj.fahrenheitTemp) + '°F';
  } else if (unitBtn.textContent === '°C') {
    currentTemp.textContent = Math.round(obj.celciusTemp) + '°C';
  }
  conditonText.textContent = obj.conditionText;
  cityHeader.textContent = obj.city;

  const daysArr = obj.forecastDays;
  //Looping through each of the three days//
  for (let i = 0; i < daysArr.length; i++) {
    let date = daysArr[i].date;
    let maxTempFarenheit = daysArr[i].maxTempFaren;
    let minTempFarenheit = daysArr[i].minTempFaren;
    let maxTempCelsius = daysArr[i].maxTempCels;
    let minTempCelsius = daysArr[i].minTempCels;

    dateContainerArr[i].textContent = getDayName(date);
    displayWeatherIcon(daysArr[i].conditionText, foreCastDaysContainers[i]);
    //Looping each minMax arrays children p elements//
    for (let j = 0; j < minMaxArr[i].children.length; j++) {
      if (unitBtn.textContent === '°F') {
        minMaxArr[i].children[0].textContent =
          Math.round(maxTempFarenheit) + '°F';
        minMaxArr[i].children[1].textContent =
          Math.round(minTempFarenheit) + '°F';
      } else if (unitBtn.textContent === '°C') {
        minMaxArr[i].children[0].textContent =
          Math.round(maxTempCelsius) + '°C';
        minMaxArr[i].children[1].textContent =
          Math.round(minTempCelsius) + '°C';
      }
    }
  }
}
//Function to convert dates to day names//
function getDayName(date) {
  const today = new Date();
  const day = new Date(date);
  let shortDayName;

  day.setDate(day.getDate() + 1);

  if (
    day.getFullYear() === today.getFullYear() &&
    day.getMonth() === today.getMonth() &&
    day.getDate() === today.getDate()
  ) {
    shortDayName = 'Today';
  } else if (
    day.getFullYear() === today.getFullYear() &&
    day.getMonth() === today.getMonth() &&
    day.getDate() === today.getDate() + 1
  ) {
    shortDayName = 'Tomorrow';
  } else {
    shortDayName = day.toLocaleDateString('en-US', { weekday: 'short' });
  }

  return shortDayName;
}
//Event listner for searching cities//
searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  if (searchInput.value.trim() === '') {
    // If empty, set custom validity and report it
    searchInput.setCustomValidity('Please enter city or zip code');
    form.reportValidity();
  } else {
    // If not empty, clear custom validity and proceed with weather retrieval
    searchInput.setCustomValidity('');
    let searchValue = searchInput.value;
    await getWeather(searchValue);
    searchInput.value = '';
  }
});

//Function to display icons//
function displayWeatherIcon(conditonText, imgContainer) {
  if (conditonText === 'Clear' || conditonText === 'clear') {
    imgContainer.src = '/icons/clear.png';
  } else if (conditonText.includes('rain') || conditonText.includes('Rain')) {
    imgContainer.src = '/icons/rain.png';
  } else if (
    conditonText.includes('cloudy') ||
    conditonText.includes('Cloudy')
  ) {
    imgContainer.src = 'icons/cloudy.png';
  } else if (conditonText.includes('snow') || conditonText.includes('Snow')) {
    imgContainer.src = 'icons/snow.png';
  } else if (conditonText.includes('Sunny')) {
    imgContainer.src = 'icons/sunny.png';
  } else if (conditonText.includes('Mist')) {
    imgContainer.src = 'icons/mist.png';
  } else if (conditonText.includes('Overcast')) {
    imgContainer.src = 'icons/overcast.png';
  }
}

function setBackgroundColor(text) {
  if (text.includes('Sunny')) {
    body.style.backgroundImage = 'var(--blue)';
  } else if (
    text.includes('Rain') ||
    text.includes('Cloudy') ||
    text.includes('Mist') ||
    text.includes('Overcast') ||
    text.includes('cloudy')
  ) {
    body.style.backgroundImage = 'var(--grey)';
  } else if (text.includes('Clear')) {
    body.style.backgroundImage = 'var(--night)';
  } else if (
    text.includes('Snow') ||
    text.includes('snow') ||
    text.includes('Flurries')
  ) {
    body.style.backgroundImage = 'var(--snow)';
  }
}

// //Event for changing units//
unitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (unitBtn.textContent === '°F') {
    unitBtn.textContent = '°C';
    displayData(currentWeatherInfo);
    // displayData(weatherInfo);
  } else if (unitBtn.textContent === '°C') {
    unitBtn.textContent = '°F';
    // displayData(weatherInfo);
    displayData(currentWeatherInfo);
  }
});
