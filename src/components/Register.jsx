import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { solicitud } from '../utils/fetchWrapper.js';
import "../styles/register.css";

const Register = () => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await solicitud.post({
        endpoint: "register",
        body: { username, email, password },
      });
      if (!response.ok) throw new Error("Registration error");

      navigate("/login");
    } catch (err) {
      setError("Server error. Try again");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h1 className="register-title">Create Account</h1>
        <input
          className="register-input"
          type="text"
          placeholder="Full Name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="register-input"
          type="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="register-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register-button" onClick={handleRegister}>
          Sign In
        </button>
        <a
          className="register-link"
          onClick={() => navigate("/login")}
        >
Do you already have an account? Log in
</a>
        {error && <p className="register-error">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
