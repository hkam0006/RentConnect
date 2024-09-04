import React, { useEffect, useState } from 'react'
import NavigationMenu from '../navigation_menu/NavigationMenus';
import { supabase } from '../../supabase';
import useGetRenterByRenterID from '../../queries/Renter/useGetRenterByRenterID';
import { Box } from '@mui/material';

export default function Rprofile() {
    const [user, setUser] = useState({});
    const fetchRenter = useGetRenterByRenterID();
    const [renter, setRenter] = useState({});
    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then(async (value) =>{
                if (value.data?.user) {
                    const {data} = await fetchRenter(value.data.user.id);
                    setRenter(data);
                }
            })
        }
        getUserData();
    }, []);
   

    return (
        <NavigationMenu>
            <Box>

            </Box>
        </NavigationMenu>
    )
}
