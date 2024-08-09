import * as React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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
import InspectionRunsIcon from "@mui/icons-material/AssignmentTurnedIn";
import ApplicationsIcon from "@mui/icons-material/Apps";
import PropertiesIcon from "@mui/icons-material/AccountBalance";
import ReferencesIcon from "@mui/icons-material/People";
import ContactsIcon from "@mui/icons-material/Contacts";
import KeysIcon from "@mui/icons-material/VpnKey";
import AddPropertyIcon from "@mui/icons-material/Add";
import HelpIcon from "@mui/icons-material/Help";
const drawerWidth = 200;

export default function SideDrawer() {
  return (
    <Drawer
      variant="permanent"
      anchor='left'
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
          {[
            { text: "Dashboard", icon: <HomeIcon />, link: "/dashboard" },
            { text: "Messages", icon: <ChatIcon />, link: "/messages" },
            {text: "Properties", icon: <PropertiesIcon />, link: "/property",},
            {
              text: "Inspections",
              icon: <InspectionIcon />,
              link: "/inspection",
            },

            {
              text: "References",
              icon: <ReferencesIcon />,
              link: "/references",
            },
            { text: "Contacts", icon: <ContactsIcon />, link: "/contacts" },
            { text: "Help", icon: <HelpIcon />, link: "/help" },
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.link}
                sx={{ paddingRight: "8px" }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer >
  );
}
