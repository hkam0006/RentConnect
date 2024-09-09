import React, { useEffect, useState } from 'react'
import NavigationMenu from '../navigation_menu/NavigationMenus';
import { supabase } from '../../supabase';
import { Box, Button, Card, CardContent, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import useGetPropertyManagerByPropertyManagerID from '../../queries/Property Manager/useGetPropertyManagerByPropertyManagerID';
import useGetCompanyByCompanyID from '../../queries/Company/useGetCompanyByCompanyID';
import { useNavigate, useParams } from 'react-router-dom';
import useGetPropertiesByPropertyManagerID from '../../queries/Property/useGetPropertiesByPropertyManagerID';
import ImageCarousel from '../property_page/ImageCarousel';
import useUpdatePropertyManager from '../../mutators/Property Manager/useUpdatePropertyManager';

export default function PMprofileForPM() {
    const navigate = useNavigate();
    const fetchPropertyManager = useGetPropertyManagerByPropertyManagerID();
    const [propertyManager, setPropertyManager] = useState({});
    const fetchCompany = useGetCompanyByCompanyID();
    const [pmCompany, setPMCompany] = useState({});
    const { pmID } = useParams()
    const [properties, setProperties] = useState([{}])
    const fetchProperies = useGetPropertiesByPropertyManagerID();
    const [user, setUser] = useState({});
    const [editing, setEditing] = useState(false);
    const updatePropertyManager = useUpdatePropertyManager();

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
        async function getUserData() {
            await supabase.auth.getUser().then((value) =>{
                if (value.data?.user) {
                    setUser(value.data.user);
                }
            })
        }
        
        getUserData();
        getPMData();
        getPMProperties();
    }, []);

    const handleSaveChanges = () => {
        var new_property_manager_data = propertyManager;
        new_property_manager_data.property_manager_about_me = newAboutMe;
        new_property_manager_data.property_manager_email = newEmail;
        new_property_manager_data.property_manager_first_name = newFName;
        new_property_manager_data.property_manager_last_name = newLName;
        new_property_manager_data.property_manager_phone_number = newPhone;
        setPropertyManager(new_property_manager_data);
        updatePropertyManager(pmID, newFName, newLName, newPhone, newEmail, newAboutMe);
        setEditing(false);
    };

    const handleStartEditing = () => {
        setNewAboutMe(propertyManager.property_manager_about_me);
        setNewEmail(propertyManager.property_manager_email);
        setNewFname(propertyManager.property_manager_first_name);
        setNewLname(propertyManager.property_manager_last_name);
        setNewPhone(propertyManager.property_manager_phone_number);
        setEditing(true);
    };

    const [newFName, setNewFname] = useState('');
    const handleNewFnameChange = f => {
        setNewFname(f.target.value);
    };
    const [newLName, setNewLname] = useState('');
    const handleNewLnameChange = f => {
        setNewLname(f.target.value);
    };
    const [newEmail, setNewEmail] = useState('');
    const handleNewEmailChange = f => {
        setNewEmail(f.target.value);
    };
    const [newPhone, setNewPhone] = useState('');
    const handleNewPhoneChange = f => {
        if (!Number.isNaN(Number(f.target.value))){
            setNewPhone(f.target.value);
        }
    };
    const [newAboutMe, setNewAboutMe] = useState('');
    const handleNewAboutMeChange = f => {
        setNewAboutMe(f.target.value);
    };

    return (
        <NavigationMenu>
            <Container sx={{mt:'8%', ml:'1%'}}>
                <Card>
                    <CardContent>
                        <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                            {!editing?
                            <Typography variant='h2'>
                                {propertyManager.property_manager_first_name} {propertyManager.property_manager_last_name}
                            </Typography>
                            :
                            <Box sx={{display:'flex', alignItems:'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Typography variant='h5' sx={{fontWeight:'bold'}}>Name:</Typography>
                                <TextField id='new-fname' onChange={handleNewFnameChange} value={newFName} variant="outlined"/>
                                <Typography variant='h5' sx={{fontWeight:'bold'}}>Surame:</Typography>
                                <TextField id='new-lname' onChange={handleNewLnameChange} value={newLName} variant="outlined"/>
                            </Box>}

                            {!editing?
                            <Box sx={{display:'flex', justifyContent: 'flex-end', flexDirection: 'column'}}>
                                <Typography variant='h5' sx={{textAlign: 'right'}}>
                                    {propertyManager.property_manager_email}
                                </Typography>
                                <Typography variant='h5' sx={{textAlign: 'right'}}>
                                    {propertyManager.property_manager_phone_number}
                                </Typography>
                            </Box>
                            :
                            <Box sx={{display:'flex', justifyContent: 'flex-end', flexDirection: 'row'}}>
                                <Box sx={{display:'flex', alignItems:'center', justifyContent: 'flex-end', flexDirection: 'row'}}>
                                    <Typography variant='h5' sx={{fontWeight:'bold'}}>Email: </Typography>
                                    <TextField id='new-email' onChange={handleNewEmailChange} value={newEmail} variant="outlined"/>
                                </Box>
                                <Box sx={{display:'flex', alignItems:'center', justifyContent: 'flex-end', flexDirection: 'row'}}>
                                    <Typography variant='h5' sx={{fontWeight:'bold'}}>Phone: </Typography>
                                    <TextField id='new-phone' onChange={handleNewPhoneChange} value={newPhone} variant="outlined"/>
                                </Box>
                            </Box>}
                        </Box>
                        <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                            <Typography variant='h5'>
                                {pmCompany.company_name}
                            </Typography>
                            {user.id = pmID?
                            <React.Fragment>{!editing?<Button variant="contained" disableElevation onClick={handleStartEditing}>Edit Profile</Button>
                            :
                            <Button variant="contained" disableElevation onClick={handleSaveChanges}>Save</Button>}</React.Fragment>
                            :
                            <Button variant="contained" disableElevation onClick={() => navigate(`/messages/${propertyManager.property_manager_id}`)}>Message</Button>}
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
                        {!editing?
                        <Typography>
                            {propertyManager.property_manager_about_me}
                        </Typography>
                        :
                        <TextField 
                        id='new-about-me' 
                        onChange={handleNewAboutMeChange} 
                        value={newAboutMe} 
                        variant="outlined"
                        multiline
                        sx={{height:'55vh'}}
                        fullWidth/>}
                        
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
