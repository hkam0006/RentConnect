import React, { useCallback, useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardActions, Button, Grid, Avatar, Stack, useMediaQuery, useTheme, IconButton } from '@mui/material';
import NavigationMenu from '../navigation_menu/NavigationMenus';
import useGetPreviousTenanciesByRenterID from '../../queries/Previous Tenancy/useGetPreviousTenanciesByRenterID';
import { useSelector } from 'react-redux';
import AppLoader from '../../manager-components/property_page/AppLoader';
import useGetRenterEmployersByID from '../../queries/Renter Employer/useGetRenterEmployersByID';
import ReferenceModal from './ReferenceModal';
import useSubscribeTableByRenterID from '../../subscribers/useSubscribeTableByRenterID';
import useRemovePreviousTenancy from '../../mutators/Previous Tenancy/useRemovePreviousTenancyByID';
import useRemoveRenterEmployer from '../../mutators/Renter Employer/useRemoveRenterEmployerbyID';
import AddReferenceModal from './AddReferenceModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const TenantReferences = () => {
  const renterId = useSelector(state => state.user.currentUser?.renter_id)
  const [loading, setLoading] = useState(true)
  const [editModal, setEditModal] = useState()
  const [addModal, setAddModal] = useState(false)
  const [employerReferences, setEmployerReferences] = useState([])
  const [rentalHistoryReferences, setRentalHistoryReferences] = useState([])
  const removePreviousTenancy = useRemovePreviousTenancy();
  const removeRenterEmployer = useRemoveRenterEmployer()
  
  const loadingCallback = () => {
    if (loading){
      setLoading(false)
    }
  }

  const fetchedEmployerReferences = useGetRenterEmployersByID(renterId, loadingCallback);
  const { previousTenancies: fetchedPreviousTenancyReferences } = useGetPreviousTenanciesByRenterID(renterId, loadingCallback)

  useEffect(() => {
    if (fetchedEmployerReferences) {
      setEmployerReferences(fetchedEmployerReferences)
    }
    if (fetchedPreviousTenancyReferences){
      setRentalHistoryReferences(fetchedPreviousTenancyReferences)
    }
  }, [fetchedEmployerReferences, fetchedPreviousTenancyReferences])



  const updateRental = useCallback((payload) => {
    switch (payload.eventType){
      case 'INSERT':
        setRentalHistoryReferences([...rentalHistoryReferences, payload.new])
        break
      case 'UPDATE':
        const updatedList = rentalHistoryReferences.map((rental) => {
          if (rental.previous_tenancy_id === payload.new.previous_tenancy_id){
            return payload.new
          }
          return rental
        })
        setRentalHistoryReferences(updatedList)
        break
      case 'DELETE':
        const filteredList = rentalHistoryReferences.filter((rental) => rental.previous_tenancy_id !== payload.old.previous_tenancy_id)
        setRentalHistoryReferences(filteredList)
        break
    }
  })

  const updateEmployer = useCallback((payload) => {
    switch (payload.eventType){
      case 'INSERT':
        setEmployerReferences((prev) => [...prev, payload.new])
        break
      case 'UPDATE':
        const updatedList = employerReferences.map((reference) => {
          if (reference.previous_tenancy_id === payload.new.previous_tenancy_id){
            return payload.new
          }
          return reference
        })
        setEmployerReferences(updatedList)
        break
      case 'DELETE':
        const filteredList = employerReferences.filter((reference) => reference.previous_tenancy_id !== payload.old.previous_tenancy_id)
        setEmployerReferences(filteredList)
        break
    }
  })

  const handleDelete = (type, reference) => {
    if (type === 'rental'){
      removePreviousTenancy(reference.previous_tenancy_id, renterId)
    } else {
      removeRenterEmployer(reference.renter_employment_id, renterId)
    }
  }

  useSubscribeTableByRenterID('PREVIOUS-TENANCY', renterId, updateRental)
  useSubscribeTableByRenterID('RENTER-EMPLOYER', renterId, updateEmployer)

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  if (loading) return <NavigationMenu>
    <AppLoader />
  </NavigationMenu>


  return (
    <NavigationMenu>
      {Boolean(editModal) && <ReferenceModal onClose={() => setEditModal(null)} reference={editModal}/>}
      {addModal && <AddReferenceModal onClose={() => setAddModal(false)}/>}
      <div style={{ padding: "20px", marginTop: "64px" }}>
          <Stack direction='row' gap={2} sx={{alignItems: "center", justifyContent: "space-between"}}>
            <Typography variant="h4" component="h1">
              Tenant References
            </Typography>
            {!isXs ? (
              <Button variant='contained' onClick={() => setAddModal(true)}>Add References</Button>
            ): (
              <IconButton onClick={() => setAddModal(true)} sx={{border: 'solid 2px', borderColor: theme.palette.primary }}>
                <AddCircleOutlineIcon color='primary'/>
              </IconButton>
            )}
          </Stack>

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
              <Grid item xs={12} sm={12} md={6} xl={4}key={reference.renter_employer_id}>
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
                    <Button variant='contained' color='error' onClick={() => handleDelete('employer', reference)}>Delete</Button>
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
                    <Typography variant="body2" >
                      Address: {reference.previous_tenancy_address}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Contact: {reference.previous_tenancy_contact_email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Phone: {reference.previous_tenancy_contact_phone}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant='contained' color='primary' onClick={() => setEditModal({...reference, type: "rental"})}>Edit</Button>
                    <Button variant='contained' color='error' onClick={() => handleDelete('rental', reference)}>Delete</Button>
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