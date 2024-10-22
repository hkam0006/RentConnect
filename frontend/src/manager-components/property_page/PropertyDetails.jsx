import React, { useEffect, useState } from 'react';
import { Container, Stack, Typography, Box, Paper, Grid, Divider, Card, CardContent, CardMedia, Button } from '@mui/material';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import EditIcon from '@mui/icons-material/Edit';
import { PropertyApplicationsTable } from './PropertyApplicationsTable';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DeckIcon from '@mui/icons-material/Deck';
import EditPropertyModal from './EditPropertyModal';
import ImageCarousel from './ImageCarousel';
import NavigationMenu from '../navigation_menu/NavigationMenus';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useGetPropertyByPropertyID from '../../queries/Property/useGetPropertyByPropertyID'
import AppLoader from './AppLoader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useGetApplicationsByPropertyID from '../../queries/Application/useGetApplicationsByPropertyID';
import PropertyMap from '../../public-components/PropertyMap';

const fullAddress = (p) => {
  return `${p.property_street_number} ${p.property_street_name}, ${p.property_suburb}, ${p.property_state} ${p.property_postcode}`;
};

export default function PropertyDetails() {

  // property ID to query database.
  const { propertyId } = useParams()
  const { property, loading } = useGetPropertyByPropertyID(propertyId)
  const { applications, applicationsLoading } = useGetApplicationsByPropertyID(propertyId)
  const navigate = useNavigate()

  // For editting modal
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Edit modal submit functionality
  const handleSubmit = () => {

    // For editting, handle database changes here
    //setProperty({ ...property, ...data });
    handleClose();
  };

  // Set the property data when it is available
  useEffect(() => {
    if (property && property[0]) {
      setData(property[0]);
    }
  }, [property]);

  // Display loader or error if needed
  if (loading) {
    return (
      <NavigationMenu>
        <Typography>Loading...</Typography>
      </NavigationMenu>
    );
  }

  // Ensure property data exists before accessing it
  let prop = property ? property[0] : null;
  if (!prop) {
    return <Typography>No property found.</Typography>;
  }

  return <>
    {open && (
      <EditPropertyModal
        property_id={propertyId}
        open={open}
        handleClose={handleClose}
        data={prop}
        setData={setData}
        handleSubmit={handleSubmit}
      />
    )}
    <NavigationMenu>
      <Box sx={{ p: "20px", mt: 9 }}>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Stack spacing={1} direction='row' sx={{ justifyContent: "space-between" }}>
              <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />} variant='contained' color='info' >Back</Button>
              <Button onClick={() => handleOpen()} variant='outlined' size='medium' endIcon={<EditIcon />}>Edit</Button>
            </Stack>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  {`${prop.property_street_number} ${prop.property_street_name} ${prop.property_street_type}`}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {`${prop.property_suburb}, ${prop.property_state}`}
                </Typography>
                <Box>
                  <Typography variant="h6">
                    {prop.property_type}
                  </Typography>
                  <Typography sx={{ mt: 8 }} variant="h6">
                    <BedIcon /> {`${prop.property_bedroom_count}`} <BathtubIcon /> {`${prop.property_bathroom_count}`} <DriveEtaIcon /> {`${prop.property_car_spot_count}`} <SquareFootIcon /> {`${prop.property_footprint}m²`}
                  </Typography>
                  <Typography sx={{ mt: 5 }} variant="h5">
                    ${`${prop.property_rent}`} per week
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    Available from: {prop.property_lease_start}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} sx={{ height: { xs: '300px', md: '400px' } }}>
                <ImageCarousel images={prop.property_pictures} />
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  Description
                </Typography>
                <Typography>
                  {prop.property_description}
                </Typography>
              </Grid>
              <Divider orientation='vertical' flexItem sx={{ mx: 2, display: { xs: 'none', md: 'block' } }} />
              <Grid item xs={12} md>
                <Typography variant="h5" gutterBottom>
                  Amenities
                </Typography>
                <Typography>
                  {prop.property_amenities}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <PropertyMap point={fullAddress(prop)} />
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box>
                  <Typography variant="h4">
                    Applications
                  </Typography>
                  {applications.length === 0 ? (
                    <Typography>There are no applications for this property.</Typography>
                  ) : (
                    <PropertyApplicationsTable applications={applications} />
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </NavigationMenu>
  </>
}