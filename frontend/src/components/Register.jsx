import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/forum.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      console.error("Error registering user", error);

      setErrorMessage("User already exist ＞﹏＜" );
    }
  };

  return (
    <div className="App">
      <h2>Registration</h2>
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

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <br />

        <button type="button" onClick={handleRegister}>
          Register
        </button>

        {message && <p>{message}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
