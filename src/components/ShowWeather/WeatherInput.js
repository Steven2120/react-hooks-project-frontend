import React from "react";
import "./WeatherInput.css";

const WeatherInput = (props) => {
  return (
    <div className="container">
      <div>{props.error ? error() : noError()}</div>
      <form onSubmit={props.loadWeather}>
        <div className="row">
          <div className="col-md-3 offset-md-2">
            <input
              type="text"
              className="form-control"
              name="city"
              placeholder="City"
              autoComplete="off"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="country"
              placeholder="Country"
              autoComplete="off"
            />
          </div>
          <div className="col-md-3 mt-md-0 text-md-left">
            <button className="btn btn-warning">Search</button>
          </div>
        </div>
      </form>
    </div>
  );
};

function error(props) {
  return (
    <div className="alert alert-danger mx-5" role="alert">
      Please Enter City and Country
    </div>
  );
}

function noError(props) {
  <div className="alert alert-danger mx-5" role="alert"></div>;
}

export default WeatherInput;
