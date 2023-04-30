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
import paths from '../constants/paths';
import { RootLayout, ErrorPage, ProtectedRoute } from "../components";

export const routes = (props) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorPage />}>
        <Route
          path="/"
          element={
            <ProtectedRoute {...props}>
              <RootLayout />
            </ProtectedRoute>
          }
        >
          <Route index path={paths.Discovery} element={<Discovery />} />
          <Route path={paths.MyProfile} element={<MyProfile />} />
        </Route>
        <Route path={paths.Login} element={<Login />} />
        <Route path={paths.Signup} element={<SignUp />} />
      </Route>
    )
  );
