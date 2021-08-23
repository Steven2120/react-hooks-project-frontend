import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";
import Cookie from "js-cookie";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CheckAuthCookie from "../hooks/CheckAuthCookie";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar(props) {
  const classes = useStyles();

  const { logUserIn } = CheckAuthCookie();

  useEffect(() => {
    logUserIn();
  }, []);

  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  const isUserLoggedIn = user ? true : false;
  const navLinkTitleOne = isUserLoggedIn ? "/profile" : "/login";
  const navLinkDisplayOne = isUserLoggedIn ? `${user.email}` : "login";
  const navLinkTitleTwo = isUserLoggedIn ? "/logout" : "/sign-up";
  const navLinkDisplayTwo = isUserLoggedIn ? "Logout" : "Sign up";

  async function logout() {
    dispatch({ type: "LOG_OUT" });
    Cookie.remove("jwt-cookie");

    try {
      let logoutUser = await axios.get(
        "http://localhost:3001/api/users/logout"
      );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">React Auth Hooks Fullstack</Link>
          </Typography>

          <NavLink activeStyle={{ color: "red" }} exact to={navLinkTitleOne}>
            <Button color="inherit" style={{ color: "white" }}>
              {navLinkDisplayOne}
            </Button>
          </NavLink>

          <NavLink
            activeStyle={{ color: "red" }}
            exact
            to={navLinkTitleTwo}
            onClick={logout}
          >
            <Button color="inherit" style={{ color: "white" }}>
              {navLinkDisplayTwo}
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
