// src/AppRouter.js
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import TopTracksPage from "./pages/TopTracksPage";
import NotFound from "./pages/NotFound";
import Root from "./pages/Root";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="top-tracks" element={<TopTracksPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
