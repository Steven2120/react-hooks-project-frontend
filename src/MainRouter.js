import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
// import Auth from "./components/Auth/Auth";
// import Home from "./components/Home/Home";
// import NotFound from "./components/NotFound/NotFound";
import Weather from "./components/Weather/Weather";

const Home = React.lazy(() => import("./components/Home/Home"));
const Auth = React.lazy(() => import("./components/Auth/Auth"));
const NotFound = React.lazy(() => import("./components/NotFound/NotFound"));

function MainRouter() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/sign-up" component={Auth} />
        <Route
          exact
          path="/login"
          component={Auth}
          render={() => <Redirect to="/weather" />}
        />
        <Route exact path="/logout" render={() => <Redirect to="/login" />} />
        <PrivateRoute exact path="/weather" component={Weather} />
        <PrivateRoute exact path="/" component={Home} />

        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default MainRouter;
