// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/profile/profileSlice";
import topTracksReducer from "./features/topTracks/topTracksSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    topTracks: topTracksReducer,
  },
});

export default store;
