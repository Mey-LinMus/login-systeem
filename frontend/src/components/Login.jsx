import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/forum.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      alert(data.message);

      if (data.message === "Login successful") {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error logging in", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <h2>User Login</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <button type="button" onClick={handleLogin}>
          Login
        </button>

        <p>
          Already have an account?
          <Link to="/">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
