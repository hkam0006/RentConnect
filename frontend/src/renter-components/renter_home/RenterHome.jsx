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
import useGetUserID from "../../queries/useGetUserID";
import useGetRenterByRenterID from "../../queries/Renter/useGetRenterByRenterID";

export default function RenterHome() {

    const {userID, loading: userLoading} = useGetUserID();
    const {renter, loading: renterLoading} = useGetRenterByRenterID(userID);
    const {applications, loading: applicationsLoading} = useGetApplicationsByRenterID(userID);

    if (userLoading || renterLoading || applicationsLoading) return <AppLoader />

    return (
        <NavigationMenu>
            <div style={{padding: "20px", marginTop: "64px"}}>
                <Typography variant='h4' fontWeight={700} color="text.primary">Welcome {renter[0].renter_first_name}!</Typography>
                <Typography variant='h6' fontWeight={700} color="text.secondary">You have 2 new messages.</Typography>

                <Paper sx={{ mt: 2, borderRadius: 3 }} elevation={3}>
                    <Typography variant='h5' fontWeight={700} color="text.primary" style={{paddingLeft: '15px', paddingTop: '10px'}}>Current Applications</Typography>
                    <ApplicationsTable applications={applications}/>
                </Paper>
            </div>
        </NavigationMenu>
    )
}
