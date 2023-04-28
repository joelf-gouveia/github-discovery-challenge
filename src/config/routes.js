import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { SignUp } from "../pages/SignUp/SignUp";
import { Login } from "../pages/Login/Login";
import { Discovery } from "../pages/Discovery/Discovery";
import { MyProfile } from "../pages/MyProfile/MyProfile";
import { RootLayout } from "../components/RootLayout/RootLayout";
//import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import ErrorPage from "../components/ErrorPage/ErrorPage";

export const routes = () =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorPage />}>
        <Route
          path="/"
          element={
            //<ProtectedRoute {...props}>
              <RootLayout />
            //</ProtectedRoute>
          }
        >
          <Route index path="/discovery" element={<Discovery />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    )
  );
