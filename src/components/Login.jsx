import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { solicitud } from '../utils/fetchWrapper.js';
import "../styles/login.css";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await solicitud.post({
        endpoint: "login",
        body: { email, password },
      });
      if (!response.ok) throw new Error("Authentication failed");

      navigate("/panel");
    } catch (err) {
      setError("Server error. Try again");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <p className="login-p">Welcome back! Please log in to your account.</p>
        <input
          className="login-input-email"
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          LogIn
        </button><br />
        <a
          className="login-link"
          onClick={() => navigate("/register")}
        >
          Don't have an account? Sign up
          </a>
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
