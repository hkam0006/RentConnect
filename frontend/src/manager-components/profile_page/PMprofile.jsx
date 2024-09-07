import React, { useEffect, useState } from 'react'
import NavigationMenu from '../navigation_menu/NavigationMenus';
import { supabase } from '../../supabase';
import { Box, Button, Card, CardContent, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import useGetPropertyManagerByPropertyManagerID from '../../queries/Property Manager/useGetPropertyManagerByPropertyManagerID';
import useGetCompanyByCompanyID from '../../queries/Company/useGetCompanyByCompanyID';
import { useNavigate, useParams } from 'react-router-dom';
import useGetPropertiesByPropertyManagerID from '../../queries/Property/useGetPropertiesByPropertyManagerID';
import ImageCarousel from '../property_page/ImageCarousel';

export default function PMprofile() {
    const navigate = useNavigate();
    const fetchPropertyManager = useGetPropertyManagerByPropertyManagerID();
    const [propertyManager, setPropertyManager] = useState({});
    const fetchCompany = useGetCompanyByCompanyID();
    const [pmCompany, setPMCompany] = useState({});
    const { pmID } = useParams()
    const [properties, setProperties] = useState([{}])
    const fetchProperies = useGetPropertiesByPropertyManagerID();
    useEffect(() => {
        async function getPMData() {
            const pm = await fetchPropertyManager(pmID);
            setPropertyManager(pm.data[0]);
            const company = await fetchCompany(pm.data[0].company_id);
            setPMCompany(company.data[0]);
        }
        async function getPMProperties() {
            const data = await fetchProperies(pmID)
            setProperties(data.data)
        }

        getPMData();
        getPMProperties();
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
            <Container sx={{mt:'1%', ml:'1%', display:'flex', flexDirection:'row'}}>
                <Card sx={{width:'30%'}}>
                    <CardContent>
                        {propertyManager.property_manager_dp?
                            <img src={propertyManager.property_manager_dp} 
                            style={{
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover'
                            }}/>
                            :
                            <img src={'https://bpnlxdcsmicxotakbydb.supabase.co/storage/v1/object/public/PMDP/default.jpg'} 
                            style={{
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover'
                            }}/>
                        }
                    </CardContent>
                </Card>
                <Card sx={{width:'28%', ml:'1%'}}>
                    <CardContent>
                        <Typography sx={{fontWeight:'bold'}}>
                            About me:
                        </Typography>
                        <Typography>
                            {propertyManager.property_manager_about_me}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{width:'40%', ml:'1%'}}>
                    <CardContent>
                        <Typography sx={{fontWeight:'bold'}}>
                        {propertyManager.property_manager_first_name} {propertyManager.property_manager_last_name}'s current listings:
                        </Typography>
                        <Paper sx={{overflow:'hidden', boxShadow:'0'}}>
                            <TableContainer sx={{height:'55vh'}}>
                                {properties.length > 0?
                                <Table>
                                    <TableBody>
                                        {properties.map((property) => (
                                            <TableRow>
                                                <TableCell sx={{width:'35%'}}>
                                                    {property?.property_pictures?<ImageCarousel images={property.property_pictures} />:''}
                                                </TableCell>
                                                <TableCell>
                                                    {property.property_unit_number?`Unit ${property.property_unit_number}`:''} {property.property_street_number} {property.property_street_name} {property.property_street_type}, {property.property_suburb} {property.property_state}
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant='contained' onClick={() => navigate(`/property/${property.property_id}`)}>View</Button>
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                :""}
                            </TableContainer>
                        </Paper>
                    </CardContent>
                </Card>
            </Container>
        </NavigationMenu>
    )
}
