import React from "react";

const clientId = import.meta.env.VITE_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-top-read",
  "user-read-recently-played",
  "user-library-read",
];

const Login = () => {
  const redirectToAuthCodeFlow = async () => {
    try {
      const authUrl = new URL("https://accounts.spotify.com/authorize");
      const verifier = generateCodeVerifier(128);
      const challenge = await pkceChallengeFromVerifier(verifier);

      window.localStorage.setItem("code_verifier", verifier);

      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("response_type", "code");
      params.append("redirect_uri", redirectUri);
      params.append("scope", scopes.join(" "));
      params.append("code_challenge_method", "S256");
      params.append("code_challenge", challenge);

      authUrl.search = params.toString();
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error("Error in redirectToAuthCodeFlow:", error);
    }
  };

  return (
    <div>
      <button onClick={redirectToAuthCodeFlow}>Login with Spotify</button>
    </div>
  );
};

export default Login;

// Utility functions
async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(arrayBuffer) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function pkceChallengeFromVerifier(verifier) {
  const hashed = await sha256(verifier);
  return base64urlencode(hashed);
}

function generateCodeVerifier(length) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return base64urlencode(array);
}
