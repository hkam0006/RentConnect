import React, { useState } from 'react'
import { Container } from "@mui/material"
import { DashboardCards } from "./DashboardCards";
import { PropertiesTable } from "./DashboardPropertiesTable";

export default function Dashboard() {
    return (
        <Container sx={{ mt: 10, height: "80vh" }} >
            <DashboardCards />
            <PropertiesTable />
        </Container >
    )
}
