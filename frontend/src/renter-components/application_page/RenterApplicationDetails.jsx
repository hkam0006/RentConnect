import React, { useEffect, useState } from 'react';
import { Container, Stack, Typography, Box, Grid, Divider, Card, CardContent, Button } from '@mui/material';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DeckIcon from '@mui/icons-material/Deck';
import { UpcomingViewingsTable } from './UpcomingViewingsTable';
import InspectionRequestModal from './InspectionRequestModal';
import ImageCarousel from '../../manager-components/property_page/ImageCarousel';

// Demo Images
import ListingImage from '../../manager-components/property_page/listing.jpg'
import ListingImageAppt from '../../manager-components/property_page/listing2.jpg'
import NavigationMenu from '../../manager-components/navigation_menu/NavigationMenus';
import { useParams } from 'react-router-dom';
import useGetPropertyByPropertyID from '../../queries/Property/useGetPropertyByPropertyID';
import AppLoader from "../../manager-components/property_page/AppLoader";
import Carousel from "react-material-ui-carousel";
import Paper from "@mui/material/Paper";
import {supabase} from "../../supabase";
import useGetUserID from "../../queries/useGetUserID";
import useGetApplicationsByPropertyAndUserID from "../../queries/Application/useGetApplicationsByPropertyAndUserID";

export default function RenterApplicationDetails() {

    // Dummy viewings
    const viewing1 = {
        date: "4th May 2024",
        time: "11:25 AM"
    }
    const viewing2 = {
        date: "22nd May 2024",
        time: "2:45 PM"
    }

    // Cuncomment below to view the table
    const viewings = [
        // viewing1,
        // viewing2
    ]

    // Dummy property
    const [property, setProperty] = useState({
        street: '1702/655 Chapel Street',
        suburb: 'South Yarra 3141',
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

    // For request inspection modal
    const [inspectionRequestOpen, setInspectionRequestOpen] = useState(false);
    const [inspectionRequestData, setInspectionRequestData] = useState(property);
    const handleInspectionRequestOpen = () => setInspectionRequestOpen(true);
    const handleInspectionRequestClose = () => setInspectionRequestOpen(false);

    // Edit modal submit functionality
    const handleInspectionRequestSubmit = () => {
        console.log("Viewing request submitted ", inspectionRequestData);
        // Foer editting, handle database changes here
        handleInspectionRequestClose();
    };

    // get user ID
    const [userID, setUserID] = useState(null);
    const { fetchUserID } = useGetUserID();
    useEffect( () => {
        (async () => {
            const {data} = await fetchUserID();
            setUserID(data);
        })();
    });

    // property ID to query database.
    const { propertyId } = useParams()
    const { fetchProperty } = useGetPropertyByPropertyID(propertyId)
    const [prop, setProp] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // get applications from user at this property
    const [applications, setApplications] = useState([]);
    const { fetchApplications } = useGetApplicationsByPropertyAndUserID(propertyId, userID)

    console.log(propertyId)

    // make calls to DB
    useEffect (() => {
        (async () => {
            const { propertyData, propertyError } = await fetchProperty()
            setProp(propertyData);
            setError(propertyError);
            const { applicationsData, applicationsError } = await fetchApplications()
            setApplications(applicationsData);
            setLoading(false);
        })();
    }, []);

    if (loading) return <AppLoader />

    if (!prop) {
        return <Typography>No property found.</Typography>
    }

    return <>
        {inspectionRequestOpen && (
            <InspectionRequestModal
                open={inspectionRequestOpen}
                handleClose={handleInspectionRequestClose}
                data={inspectionRequestData}
                setData={setInspectionRequestData}
                handleSubmit={handleInspectionRequestSubmit}
            />
        )}
        <NavigationMenu>
            <div style={{padding: "20px", marginTop: "64px"}}>
                <Paper sx={{ mt: 2, borderRadius: 3 }} elevation={3}>
                    <Card>
                        <CardContent>
                            <Grid container justifyContent='flex-end'>
                                <Stack direction='row' spacing={1}>
                                    <Button
                                        xs={{ mt: 5, mr: 2 }}
                                        variant='contained'
                                        size='medium'
                                        style={{ colour: 'white' }}
                                    >
                                        Message the agent
                                    </Button>
                                    <Button
                                        xs={{ mt: 5, mr: 2 }}
                                        variant='contained'
                                        size='medium'
                                        style={{ backgroundColor: 'green', colour: 'white' }}
                                        endIcon={<OpenInNewIcon />}
                                    >
                                        Apply
                                    </Button>
                                </Stack>
                            </Grid>
                            <Divider sx={{ mt: 2, mb: 2 }}/>
                            <Grid container spacing={2} sx={{maxHeight: '100%'}}>
                                <Grid item xs={4}>
                                    <Typography variant="h4" gutterBottom>
                                        {'' + prop.property_street_number + ' ' + prop.property_street_name + ' ' + prop.property_street_type}
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        {prop.property_suburb + ', ' + prop.property_state}
                                    </Typography>
                                    <Box>
                                        <Typography variant="h7">
                                            {prop.property_type}
                                        </Typography>
                                        <Typography sx={{ mt: 13, fontWeight: 'bold' }} variant="h5">
                                            ${'' + prop.property_rent} per week
                                        </Typography>
                                        <Typography sx={{ mt: 13 }} variant="h6">
                                            <BedIcon /> {'' + prop.property_bedroom_count} <BathtubIcon /> {'' + prop.property_bathroom_count} <DriveEtaIcon /> {'' + prop.property_car_spot_count} <SquareFootIcon /> {'' + prop.property_footprint}m²
                                        </Typography>
                                        <Typography sx={{ mt: 2 }}>
                                            Available from: {prop.property_lease_start}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={8} id="photos">
                                    {
                                        prop.property_pictures && prop.property_pictures.length > 0 && (
                                            <ImageCarousel images={prop.property_pictures} />
                                        )
                                    }
                                </Grid>
                            </Grid>
                            <Divider sx={{ mt: 2, mb: 2 }}/>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="h5" gutterBottom>
                                        Description
                                    </Typography>
                                    <Typography>
                                        {prop.property_description}
                                    </Typography>
                                    <Divider sx={{ mt: 2, mb: 2 }}/>
                                    <Typography variant="h5" gutterBottom>
                                        Amenities
                                    </Typography>
                                    <Typography>
                                        {prop.property_amenities}
                                    </Typography>
                                    <Divider sx={{ mt: 2, mb: 2 }}/>
                                    <Box>
                                        <Typography variant="h5">
                                            Upcoming viewings
                                        </Typography>
                                        <UpcomingViewingsTable
                                            viewings={viewings}
                                            property={property}
                                        />
                                    </Box>
                                </Grid>
                                <Divider orientation='vertical' flexItem sx={{ mx: 2 }} />
                                <Box
                                    display="flex"
                                    // alignItems="center"
                                    justifyContent="center"
                                    style={{ height: '100vh' }} // This makes the Box take the full height of the viewport
                                >
                                    <Typography variant="h4">
                                        Map goes here
                                    </Typography>
                                </Box>
                            </Grid>
                        </CardContent>
                    </Card>
                </Paper>
            </div>
        </NavigationMenu>
    </>
}

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