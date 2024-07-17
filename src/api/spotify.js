// src/api/spotify.js
export async function fetchProfile(token) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || "Error fetching profile");
  }

  return data;
}

export async function fetchTopTracks(token) {
  const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || "Error fetching top tracks");
  }

  return data.items;
}
