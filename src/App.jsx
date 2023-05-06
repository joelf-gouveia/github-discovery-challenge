import "./App.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "@blaumaus/react-alert";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import { routes } from "./config/routes";
import { useLocalStorage } from "./hooks";
import { AlertTemplate } from "./components";

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
  const [selectedTheme] = useLocalStorage("theme", "light");
  const isDarkMode = selectedTheme === "dark";

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AlertProvider template={AlertTemplate} {...options}>
        <RouterProvider router={routes} />
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
