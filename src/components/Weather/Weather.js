import React, { useState } from "react";
import WeatherInput from "../ShowWeather/WeatherInput";
import ShowWeather from "../ShowWeather/ShowWeather";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
const API_KEY = process.env.REACT_APP_WEATHER_API;

function Weather() {
  const [city, setCity] = useState(undefined);
  const [country, setCountry] = useState(undefined);
  const [icon, setIcon] = useState(undefined);
  const [main, setMain] = useState(undefined);
  const [fahrenheit, setFahrenheit] = useState(undefined);
  const [temp_max, setTemp_max] = useState(undefined);
  const [temp_min, setTemp_min] = useState(undefined);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  let weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog",
  };

  function getWeatherIcon(icon, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        setIcon(weatherIcon.Thunderstorm);
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon(weatherIcon.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 531:
        setIcon(weatherIcon.Rain);
        break;
      case rangeId >= 700 && rangeId <= 781:
        setIcon(weatherIcon.Atmosphere);
        break;
      case rangeId >= 800 && rangeId <= 804:
        setIcon(weatherIcon.Clouds);
        break;
      default:
        setIcon(weatherIcon.Clouds);
    }
  }

  function calcFahrenheit(temp) {
    const celsius = Math.floor(temp - 273.15);

    let f = Math.floor(celsius * (9 / 5) + 32);

    return f;
  }

  async function getWeather(event) {
    event.preventDefault();
    try {
      const city1 = event.target.elements.city.value;
      const country1 = event.target.elements.country.value;

      if (city1 && country1) {
        const apiCall = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city1},${country1}&appid=${API_KEY}`
        );

        const response = await apiCall.json();

        console.log(response);

        setCity(`${response.name}, ${response.sys.country}`);
        setFahrenheit(calcFahrenheit(response.main.temp));
        setTemp_max(calcFahrenheit(response.main.temp_max));
        setTemp_min(calcFahrenheit(response.main.temp_min));
        setDescription(response.weather[0].description);

        getWeatherIcon(weatherIcon, response.weather[0].id);
      } else {
        setError(true);
      }
    } catch (e) {
      //   toast.error(e.response.data);
      console.log(e);
    }
  }

  return (
    <div className="weather-app">
      <WeatherInput loadWeather={getWeather} error={error} />
      <ShowWeather
        city={city}
        country={country}
        temp_fahrenheit={fahrenheit}
        temp_max={temp_max}
        temp_min={temp_min}
        description={description}
        weatherIcon={icon}
      />
    </div>
  );
}

export default Weather;
