import "./App.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { routes } from "./config/routes";
import { auth } from "./config/firebase";
import { useLocalStorage } from "./hooks";

function App() {
  const theme = createTheme();
  const [user,] = useLocalStorage("users");

  auth.onAuthStateChanged((user) => {
    console.log("user", user);
  });

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes({ isAllowed: Boolean(user) })} />
    </ThemeProvider>
  );
}

export default App;
