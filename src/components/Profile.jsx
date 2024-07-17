// src/components/Profile.js
import React from "react";

const Profile = ({ profile }) => {
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
