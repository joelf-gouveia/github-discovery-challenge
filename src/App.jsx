import "./App.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import { routes } from "./config/routes";
import { useLocalStorage } from "./hooks";

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

function App() {
  const [selectedTheme,] = useLocalStorage("theme", "light");
  const isDarkMode = selectedTheme === "dark";

  console.log("HERE");

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </AlertProvider>
  );
}

export default App;
