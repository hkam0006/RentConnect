import { ReactComponent as Logo } from "../../logo.svg";
import React, { useState } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SideDrawer from "./SideDrawer";
import { Link, useNavigate } from 'react-router-dom';

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

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar sx={{backgroundColor: 'white', color: 'black', zIndex: 1201}}>
                <Toolbar>
                    <a href='/'>
                        <Logo
                            alt=""
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                        />
                    </a>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left', paddingRight: '10px' }}>
                        <a href='/' style={{ textDecoration: "none", color: "inherit" }} >
                            RentConnect
                        </a>
                        <span style={{ fontSize: "90%" }}>
                            <a href="/property" style={{ textDecoration: 'none', color: 'inherit', padding: '20px' }}>
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
                                <AccountCircle />
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
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    marginLeft: `${drawerWidth}px`, // Adjust this value to match the width of your SideDrawer
                }}
            >
                {children}
            </Box>
            <SideDrawer sx={{ zIndex: 1200 }} /> {/* Add zIndex to ensure SideDrawer stays above main content */}
        </Box>
    );
}
