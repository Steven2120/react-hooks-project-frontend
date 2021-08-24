import React, { useState } from "react";

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

  weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog",
  };

  getWeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:

        setIcon(weatherIcon.Thunderstorm)

        break;
      case rangeId >= 300 && rangeId <= 321:

          setIcon(weatherIcon.Drizzle)

        break;
      case rangeId >= 500 && rangeId <= 531:

          setIcon(weatherIcon.Rain)

        break;
      case rangeId >= 700 && rangeId <= 781:

          setIcon(weatherIcon.Atmosphere)

        break;
      case rangeId >= 800 && rangeId <= 804:

          setIcon(weatherIcon.Clouds)

        break;
      default:

          setIcon(weatherIcon.Clouds)

    }
  }


  return <div></div>;
}

export default Weather;
