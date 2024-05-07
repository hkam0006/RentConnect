import { Button, Card, CardContent, CardHeader, CardMedia, Container, Divider, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import React, { useState } from 'react'
import ImgElement from '../property_page/ImgElement';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';

// Demo Images
import ListingImage from '../property_page/listing.jpg'
import ListingImageTwo from '../property_page/listing2.jpg'
import { Bookmark, Filter, Filter2Outlined, FilterAlt, FilterAltOutlined, FilterList, Search } from '@mui/icons-material';

const testData = [
    {
        address: "123 Elm St, Clayton",
        bedrooms: 3,
        bathrooms: 2,
        carSpaces: 1,
        propertyType: "House"
    },
    {
        address: "456 Oak St, Clayton",
        bedrooms: 2,
        bathrooms: 1,
        carSpaces: 2,
        propertyType: "Apartment"
    },
    {
        address: "789 Pine St, Clayton",
        bedrooms: 4,
        bathrooms: 3,
        carSpaces: 2,
        propertyType: "Townhouse"
    },
    {
        address: "101 Maple St, Clayton",
        bedrooms: 3,
        bathrooms: 2,
        carSpaces: 1,
        propertyType: "Villa"
    },
    {
        address: "202 Birch St, Clayton",
        bedrooms: 5,
        bathrooms: 4,
        carSpaces: 3,
        propertyType: "House"
    }
];

export default function PropertySearch() {

    const [properties, setProperties] = useState(testData);

    return (
        <Container style={{ marginTop: "64px", padding: "20px" }}>
            <Stack direction={'row'} spacing={2}>
                <TextField
                    placeholder='Search properties...' fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant='contained'><FilterList /></Button>
            </Stack>
            <Grid container spacing={3} mt={1}>
                {
                    properties.map((property, index) => <Grid item sx={12} sm={4} height="fit-content">
                        <Card>
                            <CardMedia>
                                <Carousel autoPlay={false} indicators={false} swipe={true} fullHeightHover={true} animation={"slide"} navButtonsAlwaysVisible cycleNavigation={false}>
                                    <ImgElement src={ListingImage} alt='Stock Listing Image' sx={{ width: "100%", objectFit: "cover" }} />
                                    <ImgElement src={ListingImageTwo} alt='Stock Listing Image' sx={{ width: "100%" }} />
                                    <ImgElement src={ListingImageTwo} alt='Stock Listing Image' sx={{ width: "100%" }} />
                                    <ImgElement src={ListingImageTwo} alt='Stock Listing Image' sx={{ width: "100%" }} />
                                    <ImgElement src={ListingImageTwo} alt='Stock Listing Image' sx={{ width: "100%" }} />
                                </Carousel>
                            </CardMedia>
                            <CardContent>
                                <Stack direction='row' justifyContent='space-between' alignItems={'center'}>
                                    <Typography variant='h6' >{property.address}</Typography>
                                    <IconButton size='small' aria-label='bookmark' >
                                        <Bookmark />
                                    </IconButton>
                                </Stack>
                                <Stack direction='row' spacing={2}>
                                    <Stack direction={'row'} spacing={1} alignItems={"center"}>
                                        <Stack direction='row' spacing={0.5} alignItems={"center"}>
                                            <BedIcon />
                                            <Typography alignContent="center" fontWeight={700} variant='h6'>{property.bedrooms}</Typography>
                                        </Stack>
                                        <Divider orientation='vertical' />
                                        <Stack direction='row' spacing={0.5} alignItems={"center"}>
                                            <BathtubIcon />
                                            <Typography alignContent="center" fontWeight={700} variant='h6'>{property.bathrooms}</Typography>
                                        </Stack>
                                        <Divider orientation='vertical' />
                                        <Stack direction='row' spacing={0.5} alignItems={"center"}>
                                            <DirectionsCarIcon />
                                            <Typography alignContent="center" fontWeight={700} variant='h6'>{property.carSpaces}</Typography>
                                        </Stack>
                                        <Divider orientation='vertical' />
                                        <Typography variant='subtitle'>{property.propertyType}</Typography>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>)
                }
            </Grid>
        </Container >
    )
}
