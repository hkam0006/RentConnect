import React, { useEffect, useState } from 'react'
import NavigationMenu from '../navigation_menu/NavigationMenus';
import { supabase } from '../../supabase';
import {Grid, Box, Button, Card, CardContent, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import useGetPropertyManagerByPropertyManagerID from '../../queries/Property Manager/useGetPropertyManagerByPropertyManagerID';
import useGetCompanyByCompanyID from '../../queries/Company/useGetCompanyByCompanyID';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useGetPropertiesByPropertyManagerID from '../../queries/Property/useGetPropertiesByPropertyManagerID';
import ImageCarousel from '../property_page/ImageCarousel';
import useUpdatePropertyManager from '../../mutators/Property Manager/useUpdatePropertyManager';
import useGetUserID from '../../queries/useGetUserID';
import { useSelector } from 'react-redux';

export default function PMprofileForPM() {
    const navigate = useNavigate();
    const companyId = useSelector((state) => state.user.currentUser.company_id)
    const {userID: userIDData, loading: userLoading} = useGetUserID();
    const [propertyManager, setPropertyManager] = useState({});
    const fetchCompany = useGetCompanyByCompanyID();
    const [pmCompany, setPMCompany] = useState({});
    const { pmID } = useParams()
    const [properties, setProperties] = useState([{}])
    const fetchProperies = useGetPropertiesByPropertyManagerID();
    const [userID, setUserID] = useState("");
    const [editing, setEditing] = useState(false);
    const updatePropertyManager = useUpdatePropertyManager();
    const {propertyManager:pm, loading:pmLoading} = useGetPropertyManagerByPropertyManagerID(pmID);

    useEffect(() => {
        async function getPMData() {
            setPropertyManager(pm[0]);
            const company = await fetchCompany(companyId);
            setPMCompany(company.data[0]);
        }
        async function getPMProperties() {
            const data = await fetchProperies(pmID)
            setProperties(data.data)
        }
        if (!pmLoading){
            getPMData();
            getPMProperties();
        }
        if (!userLoading){
            setUserID(userIDData);
        }
    }, [pmLoading, userLoading, pmID, userIDData]);

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

    const gridContainerStyle = {
      display: "grid",
      gridAutoColumns: "1fr",
      gridAutoFlow: "column"
    };

    return (
      <NavigationMenu>
        <Container sx={{ mt: '70px', ml: '1%', p: "20px" }}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center" >
                {/* Left Side */}
                <Grid item xs={12} md={6}>
                  {!editing ? (
                    <Typography variant="h2">
                      {propertyManager.property_manager_first_name}{' '}
                      {propertyManager.property_manager_last_name}
                    </Typography>
                  ) : (
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                          Name:
                        </Typography>
                        <TextField
                          id="new-fname"
                          onChange={handleNewFnameChange}
                          value={newFName}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                          Surname:
                        </Typography>
                        <TextField
                          id="new-lname"
                          onChange={handleNewLnameChange}
                          value={newLName}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                {/* Right Side */}
                <Grid item xs={12} md={6}>
                  {!editing ? (
                    <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                      <Typography variant="h5">
                        {propertyManager.property_manager_email}
                      </Typography>
                      <Typography variant="h5">
                        {propertyManager.property_manager_phone_number}
                      </Typography>
                    </Box>
                  ) : (
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Typography variant="h5" sx={{ fontWeight: 'bold'}}>
                          Email:
                        </Typography>
                        <TextField
                          id="new-email"
                          onChange={handleNewEmailChange}
                          value={newEmail}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                          Phone:
                        </Typography>
                        <TextField
                          id="new-phone"
                          onChange={handleNewPhoneChange}
                          value={newPhone}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h5">
                    <Link href="#" to={`/companyDetails/${pmCompany.company_id}`} color="inherit" underline="none" style={{ textDecoration: 'none' }}>
                      {pmCompany.company_name}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                  {userID === pmID ? (
                    !editing ? (
                      <Button variant="contained" disableElevation onClick={handleStartEditing}>
                        Edit Profile
                      </Button>
                    ) : (
                      <Button variant="contained" disableElevation onClick={handleSaveChanges}>
                        Save
                      </Button>
                    )
                  ) : (
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={() => navigate(`/messages/${propertyManager.property_manager_id}`)}
                    >
                      Message
                    </Button>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
  
        <Container sx={{ mt: '1%', ml: '1%',  }} >
          <Grid container spacing={2} sx={{alignItems: "stretch"}}>
            {/* Profile Picture */}
            <Grid item xs={12} md={3}>
              <Card sx={{height: "100%"}}>
                <CardContent>
                  <img
                    src={
                      propertyManager.property_manager_dp ||
                      'https://bpnlxdcsmicxotakbydb.supabase.co/storage/v1/object/public/PMDP/default.jpg'
                    }
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </CardContent>
              </Card>
            </Grid>
            {/* About Me */}
            <Grid item xs={12} md={3}>
              <Card sx={{height: "100%"}}>
                <CardContent>
                  <Typography sx={{ fontWeight: 'bold' }}>About me:</Typography>
                  {!editing ? (
                    <Typography>{propertyManager.property_manager_about_me}</Typography>
                  ) : (
                    <TextField
                      id="new-about-me"
                      onChange={handleNewAboutMeChange}
                      value={newAboutMe}
                      variant="outlined"
                      multiline
                      rows={15}
                      fullWidth
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
            {/* Current Listings */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {propertyManager.property_manager_first_name}{' '}
                    {propertyManager.property_manager_last_name}
                    's current listings:
                  </Typography>
                  <Paper sx={{ overflow: 'hidden', boxShadow: 0 }}>
                    <TableContainer sx={{ height: '55vh' }}>
                      {properties.length > 0 ? (
                        <Table>
                          <TableBody>
                            {properties.map((property) => (
                              <TableRow key={property.property_id}>
                                <TableCell sx={{ width: '35%' }}>
                                  {property.property_pictures ? (
                                    <ImageCarousel images={property.property_pictures} />
                                  ) : null}
                                </TableCell>
                                <TableCell>
                                  {property.property_unit_number
                                    ? `Unit ${property.property_unit_number}`
                                    : ''}{' '}
                                  {property.property_street_number}{' '}
                                  {property.property_street_name} {property.property_street_type},{' '}
                                  {property.property_suburb} {property.property_state}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    onClick={() => navigate(`/property/${property.property_id}`)}
                                  >
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : null}
                    </TableContainer>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </NavigationMenu>
    );
  };