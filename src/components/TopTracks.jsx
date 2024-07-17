// src/components/TopTracks.js
import React from "react";
import { useSelector } from "react-redux";

const TopTracks = () => {
  const tracks = useSelector((state) => state.topTracks.tracks);
  const status = useSelector((state) => state.topTracks.status);
  const error = useSelector((state) => state.topTracks.error);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (!tracks.length) {
    return <p>No top tracks available</p>;
  }

  return (
    <section id="top-tracks">
      <h2>Top Tracks</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            {track.name} by{" "}
            {track.artists.map((artist) => artist.name).join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopTracks;
