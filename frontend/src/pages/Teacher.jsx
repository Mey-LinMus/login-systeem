import React from "react";
import "../styles/teacher.css";

const Teacher = () => {
  const handleSignOut = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <div className="homepage">
      <h1>
        Welcome teacher <br /> <br />
        o(*￣▽￣*)ブ
      </h1>
      <button type="button" onClick={handleSignOut} className="signOut">
        Sign Out
      </button>
    </div>
  );
};

export default Teacher;
