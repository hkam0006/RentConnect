import { ReactComponent as Logo } from "../../logo.svg";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SideDrawer from "./SideDrawer";
import { Link, useNavigate } from "react-router-dom";
import logo from "./RENTCONNECT-2.png";
import { supabase } from "../../supabase";

const drawerWidth = 200;

export default function NavigationMenu({ children }) {
  const [auth, setAuth] = useState(true);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null); // State variable for account circle icon

  const handleIcon = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAccountAnchorEl(null);
  };

  const handleLogOut = () => {
    setAccountAnchorEl(null);
    supabase.auth.signOut();
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar sx={{ backgroundColor: "white", color: "black", zIndex: 1201 }}>
        <Toolbar>
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img src={logo} alt="Logo" width="70" height="70" />
          </a>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left", paddingRight: "10px" }}
          >
            <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
              RentConnect
            </a>
            <span style={{ fontSize: "90%" }}>
              <a
                href="/renterhome"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  padding: "20px",
                }}
              >
                Dashboard
              </a>
            </span>
          </Typography>

          {auth && (
            <Box>
              <Box
                sx={{
                  justifyContent: "flex-end",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "130%" }}>{user.email}</Typography>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleIcon}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Menu
                id="menu-appbar"
                anchorEl={accountAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(accountAnchorEl)}
                onClose={handleAccountClose}
              >
                <MenuItem onClick={handleAccountClose}>Profile</MenuItem>
                <MenuItem onClick={handleAccountClose}>My account</MenuItem>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: `${drawerWidth}px`, // Adjust this value to match the width of your SideDrawer
        }}
      >
        {children}
      </Box>
      <SideDrawer sx={{ zIndex: 1200 }} />{" "}
      {/* Add zIndex to ensure SideDrawer stays above main content */}
    </Box>
  );
}
