import React, { useEffect, useState } from 'react'
import {Container, Paper, Typography} from "@mui/material"
import NavigationMenu from '../navigation_menu/NavigationMenus';
import { supabase } from '../../supabase';
import {PropertyStatCards} from "../../manager-components/property_page/PropertyStatCards";
import {PropertySearch} from "../../manager-components/property_page/PropertySearch";
import {PropertiesTable} from "../../manager-components/property_page/PropertiesTable";
import ApplicationsTable from "./ApplicationsTable";
import useGetApplicationsByCompanyID from "../../queries/Application/useGetApplicationsByCompanyID";
import AppLoader from "../../manager-components/property_page/AppLoader";
import useGetApplicationsByRenterID from "../../queries/Application/useGetApplicationsByRenterID";
import useGetPropertiesByCompanyID from "../../queries/Property/useGetPropertiesByCompanyID";

const TEST_RENTER_ID = "ccde4c7b-dcdb-4669-b2fd-48b354cf8ab3"

export default function RenterHome() {

    const {applications, loading} = useGetApplicationsByRenterID(TEST_RENTER_ID);

    // TODO: add code to get user ID and replace for TEST_ID

    if (loading) return <AppLoader />

    return (
        <NavigationMenu>
            <div style={{padding: "20px", marginTop: "64px"}}>
                <Typography variant='h4' fontWeight={700} color="text.primary">Welcome User!</Typography>
                <Typography variant='h6' fontWeight={700} color="text.secondary">You have 2 new messages.</Typography>

                <Paper sx={{ mt: 2, borderRadius: 3 }} elevation={3}>
                    <Typography variant='h5' fontWeight={700} color="text.primary" style={{paddingLeft: '15px', paddingTop: '10px'}}>Current Applications</Typography>
                    <ApplicationsTable applications={applications}/>
                </Paper>
            </div>
        </NavigationMenu>
    )
}
