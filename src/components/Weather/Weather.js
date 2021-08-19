import React, { Component } from "react";
// import { toast } from "react-toastify";
import WeatherInput from "../ShowWeather/WeatherInput";
import ShowWeather from "../ShowWeather/ShowWeather";
const API_KEY = process.env.REACT_APP_WEATHER_API;

export class Weather extends Component {
  state = {
    city: undefined,
    country: undefined,
    icon: undefined,
    main: undefined,
    fahrenheit: undefined,
    temp_max: undefined,
    temp_min: undefined,
    description: "",
    error: false,
  };

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
        this.setState({
          icon: this.weatherIcon.Thunderstorm,
        });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({
          icon: this.weatherIcon.Drizzle,
        });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({
          icon: this.weatherIcon.Rain,
        });
        break;
      case rangeId >= 700 && rangeId <= 781:
        this.setState({
          icon: this.weatherIcon.Atmosphere,
        });
        break;
      case rangeId >= 800 && rangeId <= 804:
        this.setState({
          icon: this.weatherIcon.Clouds,
        });
        break;
      default:
        this.setState({
          icon: this.weatherIcon.Clouds,
        });
    }
  }

  calcFahrenheit(temp) {
    const celsius = Math.floor(temp - 273.15);

    let f = Math.floor(celsius * (9 / 5) + 32);

    return f;
  }

  getWeather = async (event) => {
    event.preventDefault();
    try {
      const city = event.target.elements.city.value;
      const country = event.target.elements.country.value;

      if (city && country) {
        const apiCall = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
        );

        const response = await apiCall.json();

        console.log(response);

        this.setState({
          city: `${response.name}, ${response.sys.country}`,
          fahrenheit: this.calcFahrenheit(response.main.temp),
          temp_max: this.calcFahrenheit(response.main.temp_max),
          temp_min: this.calcFahrenheit(response.main.temp_min),
          description: response.weather[0].description,
        });

        this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
      } else {
        this.setState({
          error: true,
        });
      }
    } catch (e) {
      //   toast.error(e.response.data);
      console.log(e);
    }
  };

  render() {
    return (
      <div className="weather-app">
        <WeatherInput loadWeather={this.getWeather} error={this.state.error} />
        <ShowWeather
          city={this.state.city}
          country={this.state.country}
          temp_fahrenheit={this.state.fahrenheit}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default Weather;
