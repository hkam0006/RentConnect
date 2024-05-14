import React, { useState } from 'react'
import { Container } from "@mui/material"
import { DashboardCards } from "./DashboardCards";
import { PropertiesTable } from "./DashboardPropertiesTable";
import NavigationMenu from '../navigation_menu/NavigationMenus';

export default function Dashboard() {
    return (
        <NavigationMenu>
        <Container sx={{ mt: 10, height: "80vh" }} >
            <DashboardCards />
            <PropertiesTable />
        </Container >
        </NavigationMenu>
    )
}
