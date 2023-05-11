import { createTheme } from "@mui/material/styles";

const githubColors = {
  primary: "#24292e",
  darkPrimary: "#c9d1d9",
  secondary: "#6e5494",
  darkSecondary: "#a370f7",
  alternativeSecondary: "#bf9cff",
  darkAlternativeSecondary: "#8047e9",
  tertiary: "#ffffff",
  darkTertiary: "#0d1117",
  error: "#cb2431",
  darkError: "#f85149",
  alert: {
    success: "#28a745",
    warning: "#ffd33d",
    info: "#0366d6",
    error: "#cb2431",
  },
  darkAlert: {
    success: "#2ea44f",
    warning: "#d29922",
    info: "#58a6ff",
    error: "#f85149",
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
      contrastText: githubColors.darkPrimary
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
    primary: {
      main: githubColors.darkPrimary,
      contrastText: githubColors.primary
    },
    secondary: {
      main: githubColors.darkSecondary,
      dark: githubColors.darkAlternativeSecondary,
    },
    tertiary: {
      main: githubColors.darkTertiary,
    },
    error: {
      main: githubColors.darkError,
    },
    alert: {
      success: githubColors.darkAlert.success,
      warning: githubColors.darkAlert.warning,
      info: githubColors.darkAlert.info,
      error: githubColors.darkAlert.error,
    },
  },
});

export { lightTheme, darkTheme };
