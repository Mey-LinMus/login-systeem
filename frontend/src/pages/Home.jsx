import React from "react";
import "../styles/home.css";

const Home = () => {
  const handleSignOut = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="homepage">
      <h1>
        Welcome <br /> <br />
        o(*￣▽￣*)ブ
      </h1>
      <button type="button" onClick={handleSignOut} className="signOut">
        Sign Out
      </button>
    </div>
  );
};

export default Home;

