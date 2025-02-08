import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [fullname, setFullname] = useState(""); // Correct variable name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
        const response = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error en el registro");
        }

        setMessage("Registro exitoso. Redirigiendo al login...");
        setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
        setError(error.message);
        console.error("Error en el registro:", error);
    }
};



  return (
    <div className="register-wrapper">
      <div className="register-container">
        <p className="register-p">
          Get started with our app! <br />
          Just create an account and enjoy the experience.
        </p>
        <form onSubmit={handleRegister}>
          <input
            className="register-input"
            type="text"
            placeholder="Full Name"
            value={fullname} // Corrected
            onChange={(e) => setFullname(e.target.value)} // Corrected
          />
          <input
            className="register-input"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="register-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="register-button" type="submit">
            Sign Up
          </button>
        </form>
        <a className="register-link" onClick={() => navigate("/login")}>
          Do you already have an account? Log in
        </a>
        {message && <p className="register-success">{message}</p>}
        {error && <p className="register-error">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
