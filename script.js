const cityHeader = document.querySelector('.city-header');
const currentTemp = document.querySelector('.current-temp');
const conditonText = document.querySelector('.condition-text');

(async function getWeather(location) {
  const forecastResponse = await fetch(
    'http://api.weatherapi.com/v1/forecast.json?key=c8924334cfb94f5498e165605242003&q=paris&days=4'
  );
  const forecastData = await forecastResponse.json();
  console.log(forecastData);

  console.log(getJsonData(forecastData));
  displayData(getJsonData(forecastData).city)
})();

function getJsonData(forecast) {
  const weatherInfo = {
    city: forecast.location.name,
    fahrenheitTemp: forecast.current.temp_f,
    celciusTemp: forecast.current.temp_c,
    conditionText: forecast.current.condition.text,
  };

  return weatherInfo;
}

function displayData(obj) {
  cityHeader.textContent = obj
}



