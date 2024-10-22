import React, { useEffect, useState } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SideDrawer from "./SideDrawer";
import logo from "../../RENTCONNECT-2.png";
import { supabase } from "../../supabase";
import {useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu'; // Add Menu Icon
import { Stack } from '@mui/material';
import store from '../../utils/store';

const drawerWidth = 200;

export default function NavigationMenu({ children }) {
    const [accountAnchorEl, setAccountAnchorEl] = useState(null); 
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleIcon = (event) => {
        setAccountAnchorEl(event.currentTarget);
    };

    const handleAccountClose = () => {
        setAccountAnchorEl(null);
    };

    const navigate = useNavigate();

    const handleGoToProfile = () => {
        navigate(`/PMprofile/${user.id}`)
    };

    const handleLogOut = () => {
        supabase.auth.signOut().then(data=> {
            if (data.error){
                console.log('Failed to log out:')
                console.log(data.error)
            }
        })
        .catch(error => {
            console.log('Failed to log out:')
            console.log(error)
        })
    }

    const [user, setUser] = useState({});
    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) =>{
                if (value.data?.user) {
                    setUser(value.data.user);
                }
            })
        }
        getUserData();
    }, []);

    return (
        <Box >
            <AppBar sx={{backgroundColor: 'white', color: 'black', zIndex: 1201}}>
                <Toolbar>
                    {/* Add button to toggle drawer on mobile */}
                    <Stack direction='row' sx={{alignItems: "center", justifyContent: "space-between", flexGrow: 1}}>
                      <Stack direction={'row'} sx={{alignItems: "center"}}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            // edge="start"
                            onClick={handleDrawerToggle}
                            sx={{display: { sm: 'none' }}} // Display on mobile (xs)
                        >
                            <MenuIcon />
                        </IconButton>
                        <a href='/dashboard' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                            <img src={logo} alt="Logo" width="70" height="70" />
                        </a>
                        <Typography variant="h6" component="div" sx={{ textAlign: 'left'}} >
                            <a href='/dashboard' style={{ textDecoration: "none", color: "inherit" }}>
                                RentConnect
                            </a>
                        </Typography>
                      </Stack>

                      <Stack direction='row'>
                        {user && (
                            <Box>
                                <Box sx={{justifyContent: 'flex-end', display: 'flex', alignItems: 'center'}}>
                                    <Typography sx={{fontSize: '130%',display:{ xs: 'none', sm: 'block' }}}>
                                      {store.getState().user.currentUser.property_manager_email}
                                    </Typography>
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
                                    <MenuItem onClick={handleGoToProfile}>My Account</MenuItem>
                                    <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                                </Menu>
                            </Box>
                        )}
                      </Stack>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    marginLeft: { sm: `${drawerWidth}px` }, // Adjust this value to match the width of your SideDrawer
                }}
            >
                {children}
            </Box>

            {/* Temporary Drawer for mobile */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' }, // Only show on mobile
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, marginTop: '10px' },
                }}
            >
                <SideDrawer />
            </Drawer>

            {/* Permanent Drawer for larger screens */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' }, // Hide on mobile
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                <SideDrawer />
            </Drawer>
        </Box>
    );
}
