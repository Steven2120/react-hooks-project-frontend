import React, { useState } from "react";

import { LoginContext } from "./loginContext";

const LoginState = (props) => {
  return (
    <LoginContext.Provider value={{}}>{props.children}</LoginContext.Provider>
  );
};

export default LoginState;
