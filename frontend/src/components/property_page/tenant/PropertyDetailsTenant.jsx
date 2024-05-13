import React, {useState} from 'react';
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
import ImageCarousel from '../ImageCarousel';

// Demo Images
import ListingImage from '../listing.jpg'
import ListingImageAppt from '../listing2.jpg'
import NavigationMenu from '../../navigation_menu/NavigationMenus';

export default function PropertyDetailsTenant() {

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
        <Container>
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
                    <Grid container spacing={2} sx={{height: '400px'}}>
                        <Grid item xs={6}>
                            <Typography variant="h4" gutterBottom>
                                {property.name}
                            </Typography>
                            <Box>
                                <Typography variant="h6">
                                    {property.type}
                                </Typography>
                                <Typography sx={{ mt: 6 }} variant="h5">
                                    ${property.price} per week
                                </Typography>
                                <Typography sx={{ mt: 5 }} variant="h6">
                                    <BedIcon /> {property.bedrooms} <BathtubIcon /> {property.bathrooms} <DriveEtaIcon /> {property.carSpots} <SquareFootIcon /> {property.squareMetres}m²
                                </Typography> 
                                <Typography sx={{ mt: 2 }}>
                                    Available from: {property.available}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} id="photos">
                            <ImageCarousel images={property.listingImages} />
                        </Grid>
                    </Grid>
                    <Divider sx={{ mt: 2, mb: 2 }}/>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h5" gutterBottom>
                                Description
                            </Typography>
                            <Typography>
                                {property.description}
                            </Typography>
                        </Grid>
                        <Divider orientation='vertical' flexItem sx={{ mx: 2 }} />
                        <Grid item xs>
                            <Typography variant="h5" gutterBottom>
                                Amenities
                            </Typography>
                            <Typography>
                                <AmenitiesList
                                    amenities={property.amenities}
                                />
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ mt: 2, mb: 2 }}/>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
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
                    </Grid>
                </CardContent>
            </Card>
        </Container>
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