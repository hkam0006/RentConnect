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

const TEST_RENTER_ID = "c779fb8e-674f-46da-ba91-47cc5f2f269d"

export default function RenterHome() {
    const { fetchApplications } = useGetApplicationsByRenterID(TEST_RENTER_ID);
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const { data, error } = await fetchApplications()
            setApplications(data);
            setError(error);
            setLoading(false)
        })();
    }, [])

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