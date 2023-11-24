import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/forum.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isStrongPassword = (password) => {
    return password.length >= 8;
  };

  const handleRegister = async () => {
    try {
      if (!email) {
        setErrorMessage("Please enter a valid email");
        return;
      }

      if (!isValidEmail(email)) {
        setErrorMessage("Please enter a valid email address");
        return;
      }

      if (!isStrongPassword(password)) {
        setErrorMessage("Password is not strong enough");
        return;
      }

      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      console.error("Error registering user", error);

      setErrorMessage("User already exists ＞﹏＜");
    }
  };

  return (
    <div className="App">
      <h2>Registration</h2>
      <form>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Invalid email format"
          required
        />
        {email && !isValidEmail(email) && (
          <p style={{ color: "#930000", fontWeight: "bold" }}>
            Please enter a valid email address.
          </p>
        )}
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
        {password && !isStrongPassword(password) && (
          <p style={{ color: "#930000", fontWeight: "bold" }}>
            Password should be at least 8 characters long.
          </p>
        )}
        <br />

        <select
          placeholder="Role"
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <br />

        <button
          type="button"
          onClick={handleRegister}
          disabled={!email || !password || !isStrongPassword(password)}
        >
          Register
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
          Already have an account?
          <Link to="/login" className="undertextLink">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
