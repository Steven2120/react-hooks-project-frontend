import React from "react";
import { Route, Redirect } from "react-router-dom";
import checkIfUserIsAuth from "../utils/checkIfUserIsAuth";

const PrivateRoute = ({ component: Component, handleUserLogout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routerProps) =>
        checkIfUserIsAuth() ? (
          <Component {...routerProps} handleUserLogout={handleUserLogout} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
