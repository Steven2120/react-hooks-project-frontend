import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Weather from "./components/Weather/Weather";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";

const MainRouter = (props) => {
  return (
    <Router>
      <Nav user={props.user} handleUserLogout={props.handleUserLogout} />
      <>
        <PrivateRoute exact path="/weather" component={Weather} />
        <PrivateRoute
          exact
          path="/profile"
          component={Profile}
          handleUserLogout={props.handleUserLogout}
        />
        <Route exact path="/sign-up" component={Signup} />
        <Route
          exact
          path="/login"
          render={(routerProps) => (
            <Login {...routerProps} handleUserLogin={props.handleUserLogin} />
          )}
        />
        {/* <Route exact path="/weather" component={Weather} /> */}
        <Route exact path="/" component={Home} />
      </>
    </Router>
  );
};

export default MainRouter;
