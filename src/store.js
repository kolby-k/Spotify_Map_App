// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/profile/profileSlice";
import topTracksReducer from "./features/topTracks/topTracksSlice";
import authReducer from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    topTracks: topTracksReducer,
  },
});

export default store;
