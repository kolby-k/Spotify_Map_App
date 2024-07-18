// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLoggedIn: false,
    verifier: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.verifier = null;
    },
    setVerifier(state, action) {
      state.verifier = action.payload;
      console.log("STATE UPDATE OF VERIFIER: ", state.verifier);
    },
  },
});

export const { login, logout, setVerifier } = authSlice.actions;
export default authSlice.reducer;
