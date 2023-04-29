import React, { useEffect, useMemo,  } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Button } from "@mui/material";
import { signout } from "../../services/auth.firebase";
import { useLocalStorage } from "../../hooks";
import { getSpecificDocumentFromCollection } from "../../services/user.firebase";

const RootLayout = () => {
  const [user, setUser] = useLocalStorage("users");
  console.log('users?', user);

  useEffect(() => {
    const getUser = async () => {
      const currentUser = getSpecificDocumentFromCollection("users", user.uid);

      if (currentUser.name !== user.name || currentUser.email !== user.email) {
        setUser({...user, name: currentUser.name, email: currentUser.email})
      }
    }

    getUser();
  }, [user])

  const username = useMemo(() => user.name || '', [user])

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

export default RootLayout;
