import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Box, AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { GitHub, Brightness7, Brightness4 } from "@mui/icons-material";
import { useAuth } from "../../hooks/AuthProvider";
import { usePreferences } from "../../context/Preferences";
import paths from "../../constants/paths";

const RootLayout = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const { preferences, setPreferences } = usePreferences();

  const changeTheme = () => {
    const currentTheme = preferences.mode;

    let mode = currentTheme === "dark" ? "light" : "dark";

    setPreferences({ mode });
  }

  return (
    <>
      <Box>
        <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, alignItems: "center", display: "flex" }}>
              <GitHub size="large" sx={{ mr: 5, ml: 2 }} />
              <Button
                component={NavLink}
                to={paths.Discovery}
                sx={{
                  color:
                    pathname === paths.Discovery
                      ? "secondary.dark"
                      : "tertiary.main",
                }}
                color="inherit"
              >
                Discovery
              </Button>
            </Box>
            <IconButton sx={{ ml: 1, color: "tertiary.main" }} onClick={changeTheme}>
              {preferences.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Button
              component={NavLink}
              to={paths.MyProfile}
              sx={{
                color:
                  pathname === paths.MyProfile
                    ? "secondary.dark"
                    : "tertiary.main",
              }}
            >
              {user.name}
            </Button>
            <Button variant="body" onClick={logout} sx={{ color: "tertiary.main" }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </>
  );
};

export default RootLayout;
