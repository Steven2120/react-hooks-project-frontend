import React from "react";
import CheckAuthCookie from "../hooks/CheckAuthCookie";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import useChangeInputConfig from "../hooks/useInput";
import useFetchAPI from "../hooks/useFetchAPI";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function Auth(props) {
  const classes = useStyles();
  // console.log(props);
  // console.log(props.match);
  let isLoginRoute = props.match.path === "/login";
  let buttonTitle = isLoginRoute ? "Login" : "Sign up";
  let apiURL = isLoginRoute ? "/users/login" : "/users/create-user";

  const { checkIfCookieExists } = CheckAuthCookie();
  const [
    { isLoading, response, error, setResponse },
    handleAPICallButtonSubmit,
    isMessageOpen,
    ,
    handleMessageClose,
    successMessageValue,
  ] = useFetchAPI(apiURL);

  const [
    email,
    handleEmailChange,
    isEmailError,
    emailErrorMessage,
    isEmailDisbaled,
    clearEmailInput,
  ] = useChangeInputConfig("email");

  const [
    username,
    handleUsernameChange,
    isUsernameError,
    usernameErrorMessage,
    isUsernameDisbaled,
    clearUsernameInput,
  ] = useChangeInputConfig("username");

  const [
    password,
    handlePasswordChange,
    isPasswordError,
    passwordErrorMessage,
    isPasswordDisbaled,
    clearPasswordInput,
  ] = useChangeInputConfig("password");

  function handleOnSubmit(e) {
    e.preventDefault();

    const user = isLoginRoute
      ? { email, password }
      : { email, username, password };

    handleAPICallButtonSubmit({
      method: "post",
      data: {
        ...user,
      },
    });
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function errorMessage() {
    return (
      <Snackbar
        open={isMessageOpen}
        autoHideDuration={6000}
        onClose={handleMessageClose}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    );
  }

  function successMessage() {
    return (
      <Snackbar
        open={isMessageOpen}
        autoHideDuration={6000}
        onClose={handleMessageClose}
      >
        <Alert severity="success">{successMessageValue}</Alert>
      </Snackbar>
    );
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", color: "white" }}>
        <CircularProgress />
      </div>
    );
  }

  if (response === "user created") {
    clearEmailInput();
    clearUsernameInput();
    clearPasswordInput();
    setResponse(null);
    props.history.push("/login");
  }

  if (response === "logged in") {
    clearEmailInput();
    clearUsernameInput();
    clearPasswordInput();
    setResponse(null);
  }

  if (checkIfCookieExists()) {
    props.history.push("/");
  }

  return (
    <Grid container spacing={0} justifyContent="center">
      {successMessageValue && successMessage()}
      {error && errorMessage()}
      <form className={classes.root} onSubmit={handleOnSubmit}>
        <Grid item m={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            error={isEmailError}
            helperText={emailErrorMessage}
          />
        </Grid>

        {!isLoginRoute && (
          <Grid item m={6}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              error={isUsernameError}
              helperText={usernameErrorMessage}
            />
          </Grid>
        )}

        <Grid item m={6}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            error={isPasswordError}
            helperText={passwordErrorMessage}
          />
        </Grid>

        <Grid style={{ textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 10 }}
            disabled={
              isLoginRoute
                ? isEmailDisbaled || isPasswordDisbaled
                : isEmailDisbaled || isPasswordDisbaled || isUsernameDisbaled
            }
          >
            {buttonTitle}
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default Auth;
