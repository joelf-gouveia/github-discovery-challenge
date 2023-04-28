import React, { useMemo } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Button } from "@mui/material";
import { signout } from "../../services/auth.firebase";
import { useAuth } from "../../hooks/useAuth";

export const RootLayout = () => {
  const user = useAuth();
  const username = useMemo(() => user?.displayName || '', [user])

  const logout = async () => {
    signout();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Button component={NavLink} to="/discovery" color="inherit">
                Discovery
              </Button>
            </Box>
            <Button component={NavLink} to="/myprofile" color="inherit">
              {username}
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
