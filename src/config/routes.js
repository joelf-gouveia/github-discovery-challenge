import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { SignUp } from "../pages/SignUp/SignUp";
import { Login } from "../pages/Login/Login";
import { Discovery } from "../pages/Discovery/Discovery";
import { MyProfile } from "../pages/MyProfile/MyProfile";
import paths from "../constants/paths";
import {
  RootLayout,
  ErrorPage,
  ProtectedRoute,
  AuthLayout,
} from "../components";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<Login />} />
      <Route path={paths.Login} element={<Login />} />
      <Route path={paths.Signup} element={<SignUp />} />
      <Route
        element={
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        }
      >
        <Route path={paths.Discovery} element={<Discovery />} />
        <Route path={paths.MyProfile} element={<MyProfile />} />
      </Route>
    </Route>
  )
);
