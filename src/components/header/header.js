import React, { useState } from "react";
import "./header.css";
import { useSelector } from "react-redux";
import axios from "axios";

function Header(props) {
  const theme = useSelector((state) => state.darkModeReducer);
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);

  const [isLogInMenuOpen, setIsLoginMenuOpen] = useState(false);
  const [isSignUpMenuOpen, setIsSignUpMenuOpen] = useState(false);

  //==================================================================
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmationPassword, setConfirmationPassword] = useState(null);

  const getTheEmail = (e) => {
    setEmail(e.target.value);
  };
  const getTheName = (e) => {
    setName(e.target.value);
  };
  const getThePassword = (e) => {
    setPassword(e.target.value);
  };
  const getTheConfirmationPassword = (e) => {
    setConfirmationPassword(e.target.value);
  };

  const logIn = () => {};

  const logInMenu = () => {
    return (
      <div
        className={isLogInMenuOpen ? "login-menu-open" : "login-menu-closed"}
      >
        <div className="log-in-header">
          <h2>Log in</h2>
          <i
            onClick={() => setIsLoginMenuOpen(!isLogInMenuOpen)}
            className="close-icon-login fas fa-times fa-2x"
          ></i>
        </div>
        <hr
          style={{ marginTop: "2rem" }}
          className={theme ? "white-hr mt-2" : "dark-hr mt-1"}
        ></hr>
        <div>
          <div>
            <h5 className="login-labels">Email:</h5>
            <input
              onChange={(e) => {
                getTheEmail(e);
              }}
              className="login-input"
              for="email"
            ></input>
          </div>
          <div>
            <h5 className="login-labels">Password:</h5>
            <input
              onChange={(e) => {
                getThePassword(e);
              }}
              type="password"
              className="login-input"
            ></input>
          </div>
          <div className="log-in-button-menu">
            <h5>Log In</h5>
          </div>
          <div style={{ marginTop: "5rem" }}>
            <p>Don't have an account?</p>
            <div className="sign-up-login-button-menu">
              <h5
                onClick={() => {
                  setIsLoginMenuOpen(false);
                  setIsSignUpMenuOpen(true);
                }}
              >
                Create Account
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const signUpMenu = () => {
    return (
      <div
        className={isSignUpMenuOpen ? "signUp-menu-open" : "signUp-menu-closed"}
      >
        <div className="signUp-header">
          <h2>Sign Up</h2>
          <i
            onClick={() => setIsSignUpMenuOpen(false)}
            className="close-icon-login fas fa-times fa-2x"
          ></i>
        </div>
        <hr
          style={{ marginTop: "2rem" }}
          className={theme ? "white-hr mt-2" : "dark-hr mt-1"}
        ></hr>
        <div>
          <div>
            <h5 className="login-labels">Name:</h5>
            <input
              onChange={(e) => {
                getTheName(e);
              }}
              className="login-input"
              for="name"
            ></input>
          </div>
          <div>
            <h5 className="login-labels">Email:</h5>
            <input
              onChange={(e) => {
                getTheEmail(e);
              }}
              className="login-input"
              for="email"
            ></input>
          </div>
          <div>
            <h5 className="login-labels">Password:</h5>
            <input
              onChange={(e) => {
                getThePassword(e);
              }}
              type="password"
              className="login-input"
            ></input>
          </div>
          <div>
            <h5 className="login-labels">Reenter password:</h5>
            <input
              onChange={(e) => {
                getTheConfirmationPassword(e);
              }}
              type="password"
              className="login-input"
            ></input>
          </div>
          <div className="log-in-button-menu">
            <h5>Create Account</h5>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={theme ? "Header-dark" : "Header-light"}>
        <h2>{props.text}</h2>
        <div className="log-in-button">
          <button
            onClick={() => setIsLoginMenuOpen(!isLogInMenuOpen)}
            className="btn btn-primary"
          >
            Login
          </button>
        </div>

        {logInMenu()}
        {signUpMenu()}
      </div>
      <div
        className={
          isLogInMenuOpen || isSignUpMenuOpen
            ? "darkned-background-active"
            : "darkned-background-off"
        }
      ></div>
    </div>
  );
}

export default Header;
