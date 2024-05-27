let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let container = document.querySelector(".container");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

// to get the actual country name
const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

// to get the date and time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
  console.log(curDate);
  // // const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  console.log(formatter);
  return formatter.format(curDate);
};

let city = "pune";

// search functionality
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityName = document.querySelector(".city_name");
  console.log(cityName.value);
  city = cityName.value;

  getWeatherData();

  cityName.value = "";
});

const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=383bc9d7136dfb2523adc466282d1bfa`;
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    console.log(data);

    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
    let MainCeltemp = main.temp - 273.15 
    let MinCelshriya = main.temp_min - 273.15
    let MaxCelshriya = main.temp_max - 273.15
    let feel_like = main.feels_like - 273.15

    if (weather[0].main === "Clouds") {
      document.querySelector('.container').style.backgroundImage = 'linear-gradient(to right, #d7d2cc 0%, #304352 100%)';
      document.body.style.color="white"
      document.querySelector('.city_name').style.color = "white"
    }

    if (weather[0].main === "Clear") {
      document.querySelector('.container').style.backgroundImage = ' linear-gradient(to bottom, #BFEFFF, #87CEEB, #FFFACD)';

      document.body.style.color = "black"
      document.querySelector('.city_name').style.color = "black"
    }   

    if (weather[0].main === "Drizzle") {
      document.querySelector('.container').style.backgroundImage = ' linear-gradient(to bottom, #BFEFFF, #87CEEB, #FFFACD)';

      document.body.style.color = "black"
      document.querySelector('.city_name').style.color = "black"
    }   

    if (weather[0].main === "Thunderstorm") {
      document.querySelector('.container').style.backgroundImage = ' linear-gradient(to bottom, #4F4F4F, #292929, #1C1C1C)';

      document.body.style.color = "white"
      document.querySelector('.city_name').style.color = "white"
    }   
    if (weather[0].main === "Rain") {
      document.querySelector('.container').style.backgroundImage = ' linear-gradient(to bottom, #7F7F7F, #A9A9A9, #C0C0C0, #D3D3D3)';

      document.body.style.color = "white"
      document.querySelector('.city_name').style.color = "white"
    }   
    if (weather[0].main === "Snow") {
      document.querySelector('.container').style.backgroundImage = ' linear-gradient(to bottom, #7F7F7F, #A9A9A9, #C0C0C0, #D3D3D3)';

      document.body.style.color = "gray"
      document.querySelector('.city_name').style.color = "gray"
    }   
    if (weather[0].main === "Mist") {
      document.querySelector('.container').style.backgroundImage = ' linear-gradient(to bottom, #E0E0E0, #CCCCCC)';

      document.body.style.color = "black"
      document.querySelector('.city_name').style.color = "black"
    }   
    if (weather[0].main === "Haze") {
      document.querySelector('.container').style.backgroundImage = ' linear-gradient(to bottom, #F0F0F0, #D0D0D0)';

      document.body.style.color = "black"
      document.querySelector('.city_name').style.color = "black"
    }   
    if (weather[0].main === "Smoke") {
      document.querySelector('.container').style.backgroundImage = ' linear-gradient(to bottom, rgba(128, 128, 128, 0.7), rgba(64, 64, 64, 0.9))';

      document.body.style.color = "white"
      document.querySelector('.city_name').style.color = "white"
    }   

    // w_temperature.innerHTML = `${main.temp}&#176`;
    w_temperature.innerHTML = `${MainCeltemp.toFixed(2)}&#176`;
    w_minTem.innerHTML = `Min: ${MinCelshriya.toFixed(2)}&#176`;
    w_maxTem.innerHTML = `Max: ${MaxCelshriya.toFixed(2)}&#176`;

    w_feelsLike.innerHTML = `${feel_like.toFixed(2)}&#176`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.log(error);
  }
};

document.body.addEventListener("load", getWeatherData());
