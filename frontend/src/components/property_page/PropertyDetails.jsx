import React, { useEffect, useState } from 'react';
import { Container, Stack, Typography, Box, Paper, Grid, Divider, Card, CardContent, CardMedia, Button } from '@mui/material';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import EditIcon from '@mui/icons-material/Edit';
import ImgElement from './ImgElement'
import { PropertyApplicationsTable } from './PropertyApplicationsTable';
import Icon from '@mui/material/Icon'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DeckIcon from '@mui/icons-material/Deck';
import EditPropertyModal from './EditPropertyModal';
import ImageCarousel from './ImageCarousel';

// Demo Images
import ListingImage from './listing.jpg'
import ListingImageAppt from './listing2.jpg'
import NavigationMenu from '../navigation_menu/NavigationMenus';
import { useParams } from 'react-router-dom';
import useGetPropertyByPropertyID from '../../queries/Property/useGetPropertyByPropertyID';

export default function PropertyDetails() {

    // Dummy application
    const app1 = {
        matchScore: '55',
        name: "John Doe",
        rentToIncomeRatio: '25%',
        inspectedDate: '25 April 2024',
        status: 'Shortlisted'
    }
    // Dummy application
    const app2 = {
        matchScore: '70',
        name: "Jane Tenant",
        rentToIncomeRatio: '43%',
        inspectedDate: '25 April 2024',
        status: 'Pending'
    }
    // Dummy array of applications
    const applications = [
        app1,
        app2
    ]

    // Dummy property
    const [property, setProperty] = useState({
        name: '1702/655 Chapel Street, South Yarra 3141',
        bedrooms: 2,
        bathrooms: 2,
        carSpots: 1,
        squareMetres: 285,
        vacancy: 25,
        attendees: 31,
        applications: 15,
        listingImages: [
            ListingImage,
            ListingImageAppt,
            ListingImage,
            ListingImageAppt
        ],
        type: "Townhouse",
        price: "750",
        available: "31st March 2024",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        amenities: {
            airConditioning: ['Air conditioning', AcUnitIcon],
            wardrobes: ['Built-in wardrobes', CheckroomIcon],
            deck: ['Deck', DeckIcon]
        }
    });



    // For editting modal
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(property);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Edit modal submit functionality
    const handleSubmit = () => {

        // For editting, handle database changes here
        setProperty({ ...property, ...data });
        handleClose();
    };

    const initialData = {
        property_street_number: '',
        property_street_name: '',
        property_street_type: '',
        property_type: '',
        property_rent: '',
        property_description: '',
        property_amenities: ''
      };


    // property ID to query database.
    const { propertyId } = useParams()
    const { fetchProperty } = useGetPropertyByPropertyID(propertyId)
    const [prop, setProp] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect (() => {
        (async () => {
            const { data, error } = await fetchProperty()

            setProp(data[0]);
            setError(error);
            setLoading(false);
        })();
    }, []);

    if (!prop) {
        return <Typography>No property found.</Typography>
    }

    return <>
        {open && (
            <EditPropertyModal
                open={open}
                handleClose={handleClose}
                data={prop}
                setData={setData}
                handleSubmit={handleSubmit}
            />
        )}
        <NavigationMenu>
            <Container style={{ padding: '80px' }}>
                <Card>
                    <CardContent>
                        <Grid container justifyContent='flex-end'>
                            <Stack direction='row' spacing={1}>
                                <Button xs={{ mt: 5, mr: 2 }} variant='outlined' size='medium' endIcon={<OpenInNewIcon />}>Apply Link</Button>
                                <Button onClick={() => handleOpen()} xs={{ mt: 5 }} variant='outlined' size='medium' endIcon={<EditIcon />}>Edit</Button>
                            </Stack>
                        </Grid>
                        <Divider sx={{ mt: 2, mb: 2 }} />
                        <Grid container spacing={2} sx={{ height: '400px' }}>
                            <Grid item xs={6}>
                                <Typography variant="h4" gutterBottom>
                                    {'' + prop.property_street_number + ' ' + prop.property_street_name + ' ' + prop.property_street_type}
                                </Typography>
                                <Typography variant="h5" gutterBottom> 
                                    {prop.property_suburb + ', ' + prop.property_state}
                                </Typography>
                                <Box>
                                    <Typography variant="h6">
                                        {prop.property_type}
                                    </Typography>
                                    <Typography sx={{ mt: 8 }} variant="h6">
                                        <BedIcon /> {'' + prop.property_bedroom_count} <BathtubIcon /> {'' + prop.property_bathroom_count} <DriveEtaIcon /> {'' + prop.property_car_spot_count} <SquareFootIcon /> {'' + prop.property_footprint}m²
                                    </Typography>
                                    <Typography sx={{ mt: 5 }} variant="h5">
                                        ${'' + prop.property_rent} per week
                                    </Typography>
                                    <Typography sx={{ mt: 2 }}>
                                        Available from: {prop.property_lease_start}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} id="photos">
                                <ImageCarousel images={prop.property_pictures} />
                            </Grid>
                        </Grid>
                        <Divider sx={{ mt: 2, mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h5" gutterBottom>
                                    Description
                                </Typography>
                                <Typography>
                                    {prop.property_description}
                                </Typography>
                            </Grid>
                            <Divider orientation='vertical' flexItem sx={{ mx: 2 }} />
                            <Grid item xs>
                                <Typography variant="h5" gutterBottom>
                                    Amenities
                                </Typography>
                                <Typography>
                                    {prop.property_amenities}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ mt: 2, mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box>
                                    <Typography variant="h4">
                                        Applications
                                    </Typography>
                                    <PropertyApplicationsTable
                                        applications={applications}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </NavigationMenu>
    </>
}

// Example list of ementites for a property
const amenities = {
    airConditioning: ['Air conditioning', AcUnitIcon],
    wardrobes: ['Built-in wardrobes', CheckroomIcon],
    deck: ['Deck', DeckIcon]
};

// Function to display amenities of a property
function AmenitiesList({ amenities }) {
    const amenitiesArray = Object.values(amenities);

    // Split index for the two columns
    const halfLength = Math.ceil(amenitiesArray.length / 2);
    const firstColumnItems = amenitiesArray.slice(0, halfLength);
    const secondColumnItems = amenitiesArray.slice(halfLength);

    return (
        <Grid container>
            <Grid item xs={6}>
                {firstColumnItems.map(([label, IconComponent], index) => (
                    <Grid container key={index} alignItems='center' spacing={2}>
                        <Grid item>
                            <IconComponent />
                        </Grid>
                        <Grid item>
                            <Typography>{label}</Typography>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Grid item xs={6}>
                {secondColumnItems.map(([label, IconComponent], index) => (
                    <Grid container key={index} alignItems='center' spacing={2}>
                        <Grid item>
                            <IconComponent />
                        </Grid>
                        <Grid item>
                            <Typography>{label}</Typography>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}