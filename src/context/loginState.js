import React, { useState, useReducer } from "react";
import loginReducer from "./login-reducer";

import { LoginContext } from "./loginContext";

const LoginState = (props) => {
  return (
    <LoginContext.Provider value={{}}>{props.children}</LoginContext.Provider>
  );
};

export default LoginState;
