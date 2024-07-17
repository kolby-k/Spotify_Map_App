// src/components/Profile.js
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const profile = useSelector((state) => state.profile.data);
  const status = useSelector((state) => state.profile.status);
  const error = useSelector((state) => state.profile.error);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (!profile) {
    return null;
  }

  return (
    <section id="profile">
      <h2>
        Logged in as <span id="displayName">{profile.display_name}</span>
      </h2>
      <span id="avatar">
        {profile.images[0] && (
          <img
            src={profile.images[0].url}
            alt="Profile"
            width="200"
            height="200"
          />
        )}
      </span>
      <ul>
        <li>
          User ID: <span id="id">{profile.id}</span>
        </li>
        <li>
          Email: <span id="email">{profile.email}</span>
        </li>
        <li>
          Spotify URI:{" "}
          <a id="uri" href={profile.uri}>
            {profile.uri}
          </a>
        </li>
        <li>
          Link:{" "}
          <a id="url" href={profile.href}>
            {profile.href}
          </a>
        </li>
        <li>
          Profile Image: <span id="imgUrl">{profile.images[0]?.url}</span>
        </li>
      </ul>
    </section>
  );
};

export default Profile;
