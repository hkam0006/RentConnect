import * as React from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import InspectionIcon from "@mui/icons-material/Assignment";
import InspectionRunsIcon from "@mui/icons-material/AssignmentTurnedIn";
import ApplicationsIcon from "@mui/icons-material/Apps";
import PropertiesIcon from "@mui/icons-material/AccountBalance";
import ContactsIcon from "@mui/icons-material/Contacts";
import KeysIcon from "@mui/icons-material/VpnKey";
import AddPropertyIcon from "@mui/icons-material/Add";
import HelpIcon from "@mui/icons-material/Help";
import { useTheme } from "@mui/material";

// Define the drawer width for consistent sizing
const drawerWidth = 200;

// Define the menu items in an array for easier maintenance
const menuItems = [
  { text: "Dashboard", icon: <HomeIcon />, link: "/dashboard" },
  { text: "Messages", icon: <ChatIcon />, link: "/messages" },
  { text: "Inspection", icon: <InspectionIcon />, link: "/inspection" },
  { text: "Inspection Runs", icon: <InspectionRunsIcon />, link: "/InspectionRun" },
  { text: "Applications", icon: <ApplicationsIcon />, link: "/Application" },
  { text: "Properties", icon: <PropertiesIcon />, link: "/property" },
  { text: "Contacts", icon: <ContactsIcon />, link: "/contacts" },
  { text: "Keys", icon: <KeysIcon />, link: "/keys" },
  { text: "Add Property", icon: <AddPropertyIcon />, link: "/add_property" },
  //{ text: "Help", icon: <HelpIcon />, link: "/help" }
];
// Sidedrawer to help with navigating around the applcation
export default function SideDrawer() {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box"
        }
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton sx={{ paddingRight: "8px" }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <NavLink
                  to={item.link}
                  style={({ isActive }) => ({
                    color: isActive ? theme.palette.primary.main : "#000000",
                    fontWeight: isActive ? 700 : 400,
                    textDecoration: "none",
                    padding: "4px"
                  })}
                >
                  {item.text}
                </NavLink>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
