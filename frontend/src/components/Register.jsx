import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/forum.css";

function Register() {
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      console.error("Error registering user", error);

      setErrorMessage("User already exist ＞﹏＜");
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

        <button type="button" onClick={handleRegister}>
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
