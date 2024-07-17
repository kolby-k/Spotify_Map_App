// src/hooks/useSpotifyAuth.js
import { useState, useEffect } from "react";
import { redirectToAuthCodeFlow, getAccessToken } from "../api/auth";

export const useSpotifyAuth = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        redirectToAuthCodeFlow();
      } else {
        try {
          const accessToken = await getAccessToken(code);
          setToken(accessToken);
          localStorage.setItem("spotifyAccessToken", accessToken);
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
      }
    };

    const storedToken = localStorage.getItem("spotifyAccessToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      fetchData();
    }
  }, []);

  return token;
};
