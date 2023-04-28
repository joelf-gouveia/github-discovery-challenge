import "./App.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { routes } from "./config/routes";
import { useAuth } from "./hooks/useAuth";

function App() {
  const theme = createTheme();
  const user = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes({ isAllowed: Boolean(user) })} />
    </ThemeProvider>
  );
}

export default App;
