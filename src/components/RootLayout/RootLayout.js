import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Button } from "@mui/material";
import { signout } from "../../services/auth.firebase";
import { useLocalStorage } from "../../hooks";
import { GitHub } from "@mui/icons-material";
import paths from "../../constants/paths";

const RootLayout = () => {
  const [user, setUser] = useLocalStorage("users");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logout = () => {
    console.log("LOGIN OUT");
    signout();
    setUser(null);
    navigate(paths.Login);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
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
