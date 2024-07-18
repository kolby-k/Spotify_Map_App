import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  useEffect(() => {
    const verifier = window.localStorage.getItem("code_verifier");

    if (verifier) {
      console.log("Verifier retrieved from localStorage:", verifier);
    } else {
      console.error("No verifier found in localStorage");
      return;
    }

    if (code && verifier) {
      console.log("Authorization code from URL:", code);
      exchangeCodeForToken(code, verifier);
    } else {
      console.error("Authorization code or verifier is missing");
    }
  }, [navigate, code]);

  const exchangeCodeForToken = async (code, verifier) => {
    try {
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        client_id: import.meta.env.VITE_CLIENT_ID,
        code_verifier: base64urlencode(verifier),
      });

      console.log("Request body:", body.toString());

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from token exchange:", errorText);
        throw new Error("Failed to exchange code for token");
      }

      const data = await response.json();
      const { access_token: accessToken } = data;
      console.log("Access Token:", accessToken);

      // Redirect to the desired page
      navigate("/home"); // Change '/home' to your desired route
    } catch (error) {
      console.error("Error exchanging code for token:", error);
    }
  };

  return (
    <div>
      <h1>Callback Page</h1>
    </div>
  );
};

export default Callback;
function base64urlencode(arrayBuffer) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
