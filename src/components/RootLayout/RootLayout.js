import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Box, AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { useLocalStorage } from "../../hooks";
import { GitHub, Brightness7, Brightness4 } from "@mui/icons-material";
import { useAuth } from "../../hooks/AuthProvider";
import paths from "../../constants/paths";

const RootLayout = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [selectedTheme, setSelectedTheme] = useLocalStorage("theme");

  const setTheme = () => setSelectedTheme(selectedTheme === "dark" ? "light" : "dark")

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
            <IconButton sx={{ ml: 1 }} onClick={() => setTheme()} color="inherit">
              {selectedTheme === 'dark' ? <Brightness7 /> : <Brightness4 />}
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
            <Button variant="body" color="inherit" onClick={logout}>
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
