// import React, { useContext } from "react";
import React from "react";
import { Route, Redirect } from "react-router-dom";
// import checkIfUserIsAuth from "../utils/checkIfUserIsAuth";
// import { AuthContext } from "../../context/AuthContext";
import Cookie from "js-cookie";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const { state: user } = useContext(AuthContext);

  function checkIfCookieExists() {
    const cookie = Cookie.get("jwt-cookie");
    if (cookie) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        checkIfCookieExists() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
