// src/pages/Root.js
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";

const Root = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="flex flex-col h-screen bg-slate-200">
      <header className="bg-slate-800 p-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-lg">
            Spotify Profile App
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/home" className="text-white hover:text-gray-300">
                Home
              </Link>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="text-white hover:text-gray-300"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/top-tracks"
                    className="text-white hover:text-gray-300"
                  >
                    Top Tracks
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
