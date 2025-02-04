import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-full-screen">
      <div className="welcome-container">
        <h1 className="welcome-title">WELCOME TO</h1>
        <h1 className="welcome-app-name">NOTELY</h1>
        <p className="welcome-register">
          New in Notely? <br />
          <button
            className="welcome-link-register"
            onClick={() => navigate("/register")}
          >
            Create your account
          </button>
        </p>

        <p className="welcome-login">
          Already have an account? <br />
          <button
            className="welcome-link-login"
            onClick={() => navigate("/login")}
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Welcome;
