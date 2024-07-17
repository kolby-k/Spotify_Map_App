// src/features/topTracks/topTracksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTopTracks } from "../../api/spotify";

export const getTopTracks = createAsyncThunk(
  "topTracks/getTopTracks",
  async (token, { rejectWithValue }) => {
    try {
      return await fetchTopTracks(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const topTracksSlice = createSlice({
  name: "topTracks",
  initialState: {
    tracks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopTracks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTopTracks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tracks = action.payload;
        console.log("Top tracks: ", JSON.stringify(state.tracks, null, 2));
      })
      .addCase(getTopTracks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default topTracksSlice.reducer;
