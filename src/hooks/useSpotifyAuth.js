import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../api/auth";
import { setAuthToken } from "../features/auth/authSlice";

export const useSpotifyAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        try {
          const { access_token: accessToken, refresh_token: refreshToken } =
            await getAccessToken(code);
          localStorage.setItem("spotifyAccessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          dispatch(setAuthToken(accessToken));
          // Remove the code from the URL
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
      }
    };

    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      (async () => {
        await getRefreshToken(refreshToken, dispatch);
      })();
    } else {
      fetchData();
    }
  }, [dispatch]);

  return token;
};

const getRefreshToken = async (refreshToken, dispatch) => {
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: import.meta.env.VITE_CLIENT_ID,
    }),
  };

  try {
    const response = await fetch(url, payload);
    const data = await response.json();

    localStorage.setItem("spotifyAccessToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);

    dispatch(setAuthToken(data.access_token));
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};
