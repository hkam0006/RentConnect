import * as React from "react";
import {
  NavLink
} from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import InspectionIcon from "@mui/icons-material/Assignment";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import PropertiesIcon from "@mui/icons-material/AccountBalance";
import ReferencesIcon from "@mui/icons-material/People";
import ContactsIcon from "@mui/icons-material/Contacts";
import HelpIcon from "@mui/icons-material/Help";
import { useTheme } from "@mui/material";
const drawerWidth = 200;

const menuItems = [
  { text: "Dashboard", icon: <HomeIcon />, link: "/RenterHome" },
  { text: "Messages", icon: <ChatIcon />, link: "/renter_messages" },
  { text: "Rental Profile", icon: <PermContactCalendarIcon />, link: "/RentalProfile" },
  { text: "Properties", icon: <PropertiesIcon />, link: "/saved_properties" },
  { text: "Inspections Apply", icon: <InspectionIcon />, link: "/InspectionRenter" },
  { text: "References", icon: <ReferencesIcon />, link: "/references" },
  { text: "Contacts", icon: <ContactsIcon />, link: "/renter_contacts" },
  { text: "Help", icon: <HelpIcon />, link: "/help" },
];

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
          boxSizing: "border-box",
        },
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
                    padding: "2px",
                  })}
                >
                  <ListItemText primary={item.text} />
                </NavLink>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
