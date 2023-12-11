// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/forum.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setMessage(data.message);

      if (data.message === "Login successful") {
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify({ email }));
        }

  
        if (data.role === "teacher") {
          navigate("/teacher");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Error logging in", error);

      setErrorMessage("Email or password is wrong ＞﹏＜");
    }
  };

  return (
    <div className="App">
      <h2>Login</h2>
      <form>
        <input
          type="email"
          id="email"
          name="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <label>
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Remember me
        </label>
        <br />

        <button type="button" onClick={handleLogin}>
          Login
        </button>

        {message && <p>{message}</p>}
        {errorMessage && (
          <p
            style={{
              color: "white",
              backgroundColor: "#930000",
              padding: "10px 10px",
              borderRadius: "10px",
              width: "52%",
            }}
          >
            {errorMessage}
          </p>
        )}

        <p className="undertext">
          Don't have an account?{" "}
          <Link to="/" className="undertextLink">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
