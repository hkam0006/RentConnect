import React, { useEffect, useState } from 'react'
import NavigationMenu from '../navigation_menu/NavigationMenus';
import { supabase } from '../../supabase';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import useGetPropertyManagerByPropertyManagerID from '../../queries/Property Manager/useGetPropertyManagerByPropertyManagerID';
import useGetCompanyByCompanyID from '../../queries/Company/useGetCompanyByCompanyID';
import { useNavigate, useParams } from 'react-router-dom';

export default function PMprofile() {
    const navigate = useNavigate();
    const fetchPropertyManager = useGetPropertyManagerByPropertyManagerID();
    const [propertyManager, setPropertyManager] = useState({});
    const fetchCompany = useGetCompanyByCompanyID();
    const [pmCompany, setPMCompany] = useState({});
    const { pmID } = useParams()
    useEffect(() => {
        async function getPMData() {
            const pm = await fetchPropertyManager(pmID);
            setPropertyManager(pm.data[0]);
            const company = await fetchCompany(pm.data[0].company_id);
            setPMCompany(company.data[0]);
        }

        getPMData();
    }, []);
   

    return (
        <NavigationMenu>
            <Container sx={{mt:'8%', ml:'1%'}}>
                <Card>
                    <CardContent>
                        <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                            <Typography variant='h2'>
                                {propertyManager.property_manager_first_name} {propertyManager.property_manager_last_name}
                            </Typography>
                            <Box sx={{display:'flex', justifyContent: 'flex-end', flexDirection: 'column'}}>
                                <Typography variant='h5' sx={{textAlign: 'right'}}>
                                    {propertyManager.property_manager_email}
                                </Typography>
                                <Typography variant='h5' sx={{textAlign: 'right'}}>
                                    {propertyManager.property_manager_phone_number}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                            <Typography variant='h5'>
                                {pmCompany.company_name}
                            </Typography>
                            <Button variant="contained" disableElevation onClick={() => navigate(`/messages/${propertyManager.property_manager_id}`)}>Message</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </NavigationMenu>
    )
}
