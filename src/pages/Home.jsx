// src/pages/Home.js
import React from "react";
import { useSelector } from "react-redux";
import Login from "../components/Login";
const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Welcome Back!</h1>
          <p>Check out your profile and top tracks.</p>
        </>
      ) : (
        <>
          <h1>Home Page</h1>
          <p>
            Welcome to the Spotify Profile App! Please log in to see your
            profile and top tracks.
          </p>
          <Login />
        </>
      )}
    </div>
  );
};

export default Home;
