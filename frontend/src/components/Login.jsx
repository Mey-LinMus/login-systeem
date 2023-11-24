import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/forum.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        navigate("/home");
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

        <button type="button" onClick={handleLogin}>
          Login
        </button>

        {message && <p>{message}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

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
