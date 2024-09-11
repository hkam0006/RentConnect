import React, { useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardActions, Button, Grid, Avatar, Stack } from '@mui/material';
import NavigationMenu from '../navigation_menu/NavigationMenus';
import useGetPreviousTenanciesByRenterID from '../../queries/Previous Tenancy/useGetPreviousTenanciesByRenterID';
import { useSelector } from 'react-redux';
import AppLoader from '../../manager-components/property_page/AppLoader';
import useGetRenterEmployersByID from '../../queries/Renter Employer/useGetRenterEmployersByID';
import ReferenceModal from './ReferenceModal';

const TenantReferences = () => {
  const renterId = useSelector(state => state.user.currentUser?.renter_id)
  const [loading, setLoading] = useState(true)
  const [editModal, setEditModal] = useState()

  const loadingCallback = () => {
    if (loading){
      setLoading(false)
    }
  }
  const employerReferences = useGetRenterEmployersByID(renterId, loadingCallback);
  const rentalHistoryReferences = useGetPreviousTenanciesByRenterID(renterId, loadingCallback)

  if (loading) return <NavigationMenu>
    <AppLoader />
  </NavigationMenu>

  return (
    <NavigationMenu>
      {Boolean(editModal) && <ReferenceModal onClose={() => setEditModal(null)} reference={editModal}/>}
      <div style={{ padding: "20px", marginTop: "64px" }}>
          <Stack direction='row' gap={2} sx={{alignItems: "center"}}>
            <Typography variant="h4" component="h1">
              Tenant References
            </Typography>
            <Button variant='contained'>Add References</Button>
          </Stack>
          <Typography variant="p" component="p" gutterBottom>
            You must have this person’s consent to provide their personal information and be contacted by us during business hours.
          </Typography>

          {/* Employer References Section */}
          <Box sx={{mb: 1}}>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Employer References
            </Typography>
            <Typography variant="p" gutterBottom sx={{ mt: 4 }}>
              To confirm employment, we'll send your referee a SMS & email.
            </Typography>
          </Box>
          <Grid container spacing={4} sx={{width: "100%"}}>
            {employerReferences.map(reference => (
              <Grid item xs={12} sm={12} md={6} xl={4} key={reference.renter_employer_id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ mr: 2 }}>{reference.renter_employer_name.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="h6">{reference.renter_employer_name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Current Employer
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      Contact: {reference.renter_employer_email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Phone: {reference.renter_employer_phone_number}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant='contained' color='primary' onClick={() => setEditModal({...reference, type: "employer"})}>Edit</Button>
                    <Button variant='contained' color='error'>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Rental History References Section */}
          <Box sx={{mb: 1}}>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Previous Rental History References
            </Typography>
            <Typography variant="p" gutterBottom>
              To confirm your address history, we’ll send your referee a SMS & email.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {rentalHistoryReferences.map(reference => (
              <Grid item xs={12} sm={12} md={6} xl={4} key={reference.previous_tenancy_id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ mr: 2 }}>{reference.previous_tenancy_contact_name.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="h6">{reference.previous_tenancy_contact_name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Previous Landlord
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      Contact: {reference.previous_tenancy_contact_email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Phone: {reference.previous_tenancy_contact_phone}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant='contained' color='primary' onClick={() => setEditModal({...reference, type: "rental"})}>Edit</Button>
                    <Button variant='contained' color='error'>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </NavigationMenu>
  );
};

export default TenantReferences;