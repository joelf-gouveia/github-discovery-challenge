import { createTheme } from "@mui/material/styles";

const githubColors = {
  primary: "#24292e",
  secondary: "#6e5494",
  alternativeSecondary: "#bf9cff",
  tertiary: "#ffffff",
  error: "#cb2431",
  alert: {
    success: "#28a745",
    warning: "#ffd33d",
    info: "#0366d6",
    error: "#cb2431",
  },
  bookmarks: {
    gold: "#ffd700",
    gray: "#808080"
  }
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: githubColors.primary,
    },
    secondary: {
      main: githubColors.secondary,
      dark: githubColors.alternativeSecondary,
    },
    tertiary: {
      main: githubColors.tertiary,
    },
    error: {
      main: githubColors.error,
    },
    alert: {
      success: githubColors.alert.success,
      warning: githubColors.alert.warning,
      info: githubColors.alert.info,
      error: githubColors.alert.error,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export { lightTheme, darkTheme };
