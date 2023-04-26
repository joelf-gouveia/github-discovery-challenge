import "./App.css";
import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { router } from "./config/routes";


function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
