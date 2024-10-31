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
import BusinessIcon from "@mui/icons-material/Business";
import ChatIcon from "@mui/icons-material/Chat";
import InspectionIcon from "@mui/icons-material/Assignment";
import InspectionRunsIcon from "@mui/icons-material/AssignmentTurnedIn";
import ApplicationsIcon from "@mui/icons-material/Apps";
import PropertiesIcon from "@mui/icons-material/AccountBalance";
import ContactsIcon from "@mui/icons-material/Contacts";
import KeysIcon from "@mui/icons-material/VpnKey";
import AddPropertyIcon from "@mui/icons-material/Add";
import HelpIcon from "@mui/icons-material/Help";
import { useSelector } from "react-redux"; // Import useSelector
import { useTheme } from "@mui/material";

// Define the drawer width for consistent sizing
const drawerWidth = 200;

// SideDrawer component to help with navigating around the application
export default function SideDrawer() {
  const theme = useTheme();
  const companyId = useSelector((state) => state.user.currentUser.company_id); // Use useSelector inside the component

  // Define the menu items in an array for easier maintenance
  const menuItems = [
    { text: "Dashboard", icon: <HomeIcon />, link: "/dashboard" },
    { text: "Company", icon: <BusinessIcon />, link: `/companyDetails/${companyId}` }, // Use dynamic companyId
    { text: "Messages", icon: <ChatIcon />, link: "/messages" },
    { text: "Inspection", icon: <InspectionIcon />, link: "/inspection" },
    { text: "Inspection Runs", icon: <InspectionRunsIcon />, link: "/InspectionRun" },
    { text: "Applications", icon: <ApplicationsIcon />, link: "/Application" },
    { text: "Properties", icon: <PropertiesIcon />, link: "/property" },
    { text: "Contacts", icon: <ContactsIcon />, link: "/contacts" },
    { text: "Keys", icon: <KeysIcon />, link: "/keys" },
    { text: "Add Property", icon: <AddPropertyIcon />, link: "/add_property" },
    // { text: "Help", icon: <HelpIcon />, link: "/help" }
  ];

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
              <ListItemButton
                component={NavLink}
                to={item.link}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  textDecoration: "none",
                  color: "inherit",
                  padding: 1.7,
                  paddingLeft: 2,
                  "&.active": {
                    backgroundColor: theme.palette.action.selected,
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {item.text}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
