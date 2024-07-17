// src/App.js
import React, { useEffect, useState } from "react";
import {
  redirectToAuthCodeFlow,
  getAccessToken,
  fetchProfile,
} from "./services/auth";
import Profile from "./components/Profile";

const App = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        redirectToAuthCodeFlow();
      } else {
        try {
          const accessToken = await getAccessToken(code);
          const profileData = await fetchProfile(accessToken);
          setProfile(profileData);
        } catch (error) {
          console.error("Error fetching access token or profile:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Spotify Auth with PKCE</h1>
      {!profile ? <p>Loading...</p> : <Profile profile={profile} />}
    </div>
  );
};

export default App;
