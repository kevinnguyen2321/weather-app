const cityHeader = document.querySelector('.city-header');
const currentTemp = document.querySelector('.current-temp');
const conditonText = document.querySelector('.condition-text');
const currentConditionIcon = document.querySelector('.current-day-icon');
const foreCastDaysArr = document.querySelectorAll('.days');
const dateContainerArr = document.querySelectorAll('.date-container');
const minMaxArr = document.querySelectorAll('.max-min');

(async function getWeather(location) {
  const forecastResponse = await fetch(
    'http://api.weatherapi.com/v1/forecast.json?key=c8924334cfb94f5498e165605242003&q=chicago&days=3'
  );
  const forecastData = await forecastResponse.json();
  console.log(forecastData);

  console.log(getJsonData(forecastData));
})();

function getJsonData(forecast) {
  const weatherInfo = {
    city: forecast.location.name,
    fahrenheitTemp: forecast.current.temp_f,
    celciusTemp: forecast.current.temp_c,
    conditionText: forecast.current.condition.text,
    forecastDays: [
      {
        date: forecast.forecast.forecastday[0].date,
        maxTempFaren: forecast.forecast.forecastday[0].day.maxtemp_f,
        minTempFaren: forecast.forecast.forecastday[0].day.mintemp_f,
        maxTempCels: forecast.forecast.forecastday[0].day.maxtemp_c,
        minTempCels: forecast.forecast.forecastday[0].day.mintemp_c,
      },
      {
        date: forecast.forecast.forecastday[1].date,
        maxTempFaren: forecast.forecast.forecastday[1].day.maxtemp_f,
        minTempFaren: forecast.forecast.forecastday[1].day.mintemp_f,
        maxTempCels: forecast.forecast.forecastday[1].day.maxtemp_c,
        minTempCels: forecast.forecast.forecastday[1].day.mintemp_c,
      },
      {
        date: forecast.forecast.forecastday[2].date,
        maxTempFaren: forecast.forecast.forecastday[2].day.maxtemp_f,
        minTempFaren: forecast.forecast.forecastday[2].day.mintemp_f,
        maxTempCels: forecast.forecast.forecastday[2].day.maxtemp_c,
        minTempCels: forecast.forecast.forecastday[2].day.mintemp_c,
      },
    ],
  };

  displayData(weatherInfo);

  return weatherInfo;
}

function displayData(obj) {
  cityHeader.textContent = obj.city;
  currentTemp.textContent = obj.fahrenheitTemp;
  conditonText.textContent = obj.conditionText;
  const daysArr = obj.forecastDays;

  for (let i = 0; i < daysArr.length; i++) {
    let date = daysArr[i].date;
    let maxTemp = daysArr[i].maxTempFaren;
    let minTemp = daysArr[i].minTempFaren;

    dateContainerArr[i].textContent = getDayName(date);

    minMaxArr[i].textContent = maxTemp + ' ' + minTemp;
  }
}

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
