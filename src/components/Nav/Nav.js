import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.css";

export class Nav extends Component {
  render() {
    console.log(this.props);
    return (
      <nav className="Navbar">
        <div className="h1-logo">
          <h1>
            <Link className="selected1" to="/">
              Weather App
            </Link>
          </h1>
        </div>

        <div className="right-side-nav">
          <ul>
            <li>
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/weather">
                  Weather Search
                </NavLink>
              ) : (
                ""
              )}
            </li>
            <li>
              {this.props.user ? (
                <NavLink
                  className="selected1"
                  activeClassName="selected"
                  to="/profile"
                >
                  Profile - {this.props.user.email}
                </NavLink>
              ) : (
                <NavLink
                  className="selected1"
                  activeClassName="selected"
                  to="/sign-up"
                >
                  Sign up
                </NavLink>
              )}
            </li>
            <li>
              {this.props.user ? (
                <NavLink
                  className="selected1"
                  activeClassName="selected"
                  to="/"
                  onClick={this.props.handleUserLogout}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  className="selected1"
                  activeClassName="selected"
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
