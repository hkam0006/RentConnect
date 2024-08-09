import React, { useEffect, useState } from 'react'
import { Container } from "@mui/material"
import NavigationMenu from '../navigation_menu/NavigationMenus';
import { supabase } from '../../supabase';

export default function RenterHome() {
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

            </Container >
        </NavigationMenu>
    )
}
