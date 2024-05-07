import { Button, Card, CardContent, CardHeader, CardMedia, Container, Divider, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import React, { useEffect, useState } from 'react'
import ImgElement from '../property_page/ImgElement';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import { supabase } from '../../supabase';
import { Bookmark, FilterList, Search } from '@mui/icons-material';

// Demo Images
import ListingImage from '../property_page/listing.jpg'
import ListingImageTwo from '../property_page/listing2.jpg'

export default function PropertySearch() {

  const [properties, setProperties] = useState([]);

  const getProperties = async () => {
    const res = await supabase.from("PROPERTY").select("*");
    console.log(res.data)
    setProperties(res.data)
  }

  const fullAddress = (number, name, type, suburb, state) => {
    return `${number} ${name} ${type}, ${suburb}, ${state}`
  }

  useEffect(() => {
    getProperties()
  }, [])

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
          properties.map((property) => <Grid key={property.propert_id} item sx={12} sm={4} height="fit-content">
            <Card >
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
                  <Typography variant='body' >
                    {fullAddress(
                      property.propert_street_number,
                      property.property_street_name,
                      property.property_street_type,
                      property.property_suburb,
                      property.property_state
                    )}
                  </Typography>
                  <IconButton size='small' aria-label='bookmark' >
                    <Bookmark />
                  </IconButton>
                </Stack>
                <Stack direction='row' spacing={2}>
                  <Stack direction={'row'} spacing={1} alignItems={"center"}>
                    <Stack direction='row' spacing={0.5} alignItems={"center"}>
                      <BedIcon />
                      <Typography alignContent="center" fontWeight={700} variant='h6'>{property.property_bedroom_count}</Typography>
                    </Stack>
                    <Divider orientation='vertical' />
                    <Stack direction='row' spacing={0.5} alignItems={"center"}>
                      <BathtubIcon />
                      <Typography alignContent="center" fontWeight={700} variant='h6'>{property.property_bathroom_count}</Typography>
                    </Stack>
                    <Divider orientation='vertical' />
                    <Stack direction='row' spacing={0.5} alignItems={"center"}>
                      <DirectionsCarIcon />
                      <Typography alignContent="center" fontWeight={700} variant='h6'>{property.property_car_spot_count}</Typography>
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
