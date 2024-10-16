import React from 'react';
import '../styles/Welcome.css';

const Welcome = () => {
    return (
      <div className="full-screen">
        <h1 className="welcome-title">WELCOME TO</h1>
        <h1 className="app-name">NOTELY</h1>
        <p className="register">
          New in Notely?  <br />
          <a href="/register" className="link-register">Create your account</a>
        </p>
        <p className="login">
          Already have an account? <br />
          <a href="/login" className="link-login">Log in here</a>
        </p>
      </div>
    );
  };
  
  export default Welcome;