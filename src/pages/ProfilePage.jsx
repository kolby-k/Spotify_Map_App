import React, { useEffect } from "react";
import Profile from "../components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../features/profile/profileSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    if (!profile.data && profile.status === "idle") {
      dispatch(getProfile());
    }
  }, [dispatch, profile.data, profile.status]);

  return (
    <div>
      <h1>Profile Page</h1>
      {profile.status === "loading" && <p>Loading...</p>}
      {profile.status === "succeeded" && <Profile />}
      {profile.status === "failed" && <p>Error: {profile.error}</p>}
    </div>
  );
};

export default ProfilePage;
