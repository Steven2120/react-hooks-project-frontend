import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="home">Weather App</div>
      <div className="weather-link-div">
        <Link to="/weather" className="btn btn-primary">
          Go To Weather
        </Link>
      </div>
    </>
  );
}

export default Home;
