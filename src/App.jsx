import "./App.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "@blaumaus/react-alert";
import { ThemeProvider } from "@mui/material/styles";
import { routes } from "./config/routes";
import { AlertTemplate } from "./components";
import { InternalThemeProvider, useInternalTheme } from "./context/InternalTheme";
import { darkTheme, lightTheme } from "./theme";

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const Base = () => {
  const { internalTheme } = useInternalTheme()
  const theme = internalTheme === "dark" ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <AlertProvider template={AlertTemplate} {...options}>
        <RouterProvider router={routes} />
      </AlertProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <InternalThemeProvider>
      <Base />
    </InternalThemeProvider>
  );
}

export default App;
