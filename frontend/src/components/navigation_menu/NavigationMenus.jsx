import { ReactComponent as Logo } from "../../logo.svg";
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
  const [menuOpen, setMenuOpen] = useState(false); // State variable for menu icon menu

  const handleIcon = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuOpen(false);
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
            <span style={{fontSize: "90%"}}>
            <a href="/property" style={{ textDecoration: 'none', color: 'inherit', padding:'20px' }}>
              Property
            </a>
            </span>
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

          <Menu
            id="menu-icon"
            anchorEl={menuAnchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom', // Align menu to the bottom of the anchor
              horizontal: 'left', // Align menu to the left of the anchor
            }}
            transformOrigin={{
              vertical: 'top', // Position menu below the anchor
              horizontal: 'left', // Align menu to the left of the anchor
            }}
            PaperProps={{
              style: {
                marginTop: '10px', // Add some space above the menu
                backgroundColor: '#ffffff', // Background color of the menu
                borderRadius: '4px', // Border radius of the menu
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)', // Box shadow for the menu
              },
            }}
            MenuListProps={{
              style: {
                padding: '8px 0', // Add padding to the menu items
              },
            }}
          >
 <MenuItem  onClick={handleMenuClose}>Overview/Dashboard</MenuItem>
  <MenuItem onClick={handleMenuClose}>Messages/Inbox</MenuItem>
  <MenuItem onClick={handleMenuClose}>Inspections</MenuItem>
  <MenuItem onClick={handleMenuClose}>Inspection Runs</MenuItem>
  <MenuItem onClick={handleMenuClose}>Applications</MenuItem>
  <MenuItem onClick={handleMenuClose}>Properties</MenuItem>
  <MenuItem onClick={handleMenuClose}>References</MenuItem>
  <MenuItem  onClick={handleMenuClose}>Contacts</MenuItem>
  <MenuItem onClick={handleMenuClose}>Keys</MenuItem>
  <MenuItem onClick={handleMenuClose}>Add Property</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
