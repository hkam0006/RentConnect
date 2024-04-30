// import React from "react";
// import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ReactComponent as Logo } from "../../logo.svg";
// import PersonIcon from '@mui/icons-material/Person';
// import { MdOutlinePerson } from "react-icons/md";
// import MenuBar from "./MenuBar";
// import '../../App.css';
// import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from 'react-router-dom';


export default function NavigationMenu() {
  const [auth, setAuth] = useState(true);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null); // State variable for menu icon
  const [accountAnchorEl, setAccountAnchorEl] = useState(null); // State variable for account circle icon

  const handleIcon = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleAccountClose = () => {
    setAccountAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: 'white', color: 'black' }}> {/* Change background to white and text color to black */}
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon /> {/* Use default color (black) for the menu icon */}
          </IconButton>
          <Logo
            alt=""
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left', paddingRight: '10px' }}>
            RentConnect
            <a href="/property" style={{ textDecoration: 'none', color: 'inherit', padding:'10px' }}>
              Property
            </a>
          </Typography>

          
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleIcon}
                color="inherit"
              >
                <AccountCircle /> {/* Use default color (black) for the account circle icon */}
              </IconButton>
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
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}