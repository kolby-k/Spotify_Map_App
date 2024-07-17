// src/App.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "./features/profile/profileSlice";
import { getTopTracks } from "./features/topTracks/topTracksSlice";
import { useSpotifyAuth } from "./hooks/useSpotifyAuth";
import AppRouter from "./AppRouter";

const App = () => {
  const dispatch = useDispatch();
  const token = useSpotifyAuth();

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
      dispatch(getTopTracks(token));
    }
  }, [token, dispatch]);

  return (
    <div>
      <AppRouter />
    </div>
  );
};

export default App;
