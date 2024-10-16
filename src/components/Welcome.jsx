import React from "react";
import "../styles/Welcome.css";

const Welcome = () => {
  return (
    <div className="full-screen">
      <h1 className="welcome-title">WELCOME TO</h1>
      <h1 className="app-name">NOTELY</h1>
      <p className="register">
        New in Notely? <br />
        <button className="link-register" onclick="location.href='/register'">
          Create your account
        </button>
      </p>

      <p className="login">
        Already have an account? <br />
        <button className="link-login" onclick="location.href='/login'">
          Log in here
        </button>
      </p>
    </div>
  );
};

export default Welcome;
