import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Error en el login");

            // Save the token and redirect
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
            console.error("Error en el login:", error);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <p className="login-p">Welcome back! Please log in to your account.</p>
                <form onSubmit={handleLogin}> {/* ✅ Ensure it uses handleLogin */}
                    <input
                        className="login-input"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="login-button" type="submit">
                        Log In
                    </button>
                </form>
                <a className="login-link" onClick={() => navigate("/register")}>
                    Don't have an account? Sign up
                </a>
                {error && <p className="login-error">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
