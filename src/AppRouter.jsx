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
import ProtectedRoute from "./components/ProtectedRoute";
import Callback from "./pages/Callback";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/callback" element={<Callback />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/top-tracks"
        element={
          <ProtectedRoute>
            <TopTracksPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
