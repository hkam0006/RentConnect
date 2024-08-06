import React, { useEffect, useState } from 'react'
import { Container } from "@mui/material"
import { DashboardCards } from "./DashboardCards";
import { PropertiesTable } from "./DashboardPropertiesTable";
import NavigationMenu from '../navigation_menu/NavigationMenus';
import { supabase } from '../../supabase';

export default function Dashboard() {
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
        <NavigationMenu>
        <Container sx={{ mt: 10, height: "80vh" }} >
            <DashboardCards />
            <PropertiesTable />
        </Container >
        </NavigationMenu>
    )
}
