import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import React, { useEffect, useState } from 'react'
import ImgElement from '../property_page/ImgElement';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import { supabase } from '../../supabase';
import { Bookmark, FilterList, Search, SquareFoot } from '@mui/icons-material';
import AppLoader from '../property_page/AppLoader';
import NavigationMenu from '../navigation_menu/NavigationMenus';


const NoPropertiesFound = () => {
  return <Stack justifyContent={'center'} textAlign={'center'} mt={5}>
    <Typography variant='h6'>We couldn't find any properties that meet your search parameters.</Typography>
    <Typography variant='subtitle'>Please try adjusting your filters or search again.</Typography>
  </Stack>
}

export default function PropertySearch() {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true)

  const getProperties = async () => {
    const res = await supabase.from("PROPERTY").select("*");
    setProperties(res.data)
  }

  const fullAddress = (number, name, type, suburb, state) => {
    return `${number} ${name} ${type}, ${suburb}, ${state}`
  }

  useEffect(() => {
    getProperties().then(() => setLoading(false))
  }, [])

  if (loading) {
    return <AppLoader />
  }

  return (
    <NavigationMenu>
    <Box sx={{ padding: 2, marginTop: "64px" }}>

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
      {properties.length > 0 ? <Grid
        container
        spacing={2}
        mt={1}
        alignItems={'stretch'}
      >
        {properties.map((item) => <Grid key={item.property_id} item sx={12} sm={6} md={4} xl={2}>
          <Card sx={{ width: "100%", height: "100%" }}>
            <CardMedia>
              <Carousel
                autoPlay={false}
                indicators={false}
                swipe={true}
                fullHeightHover={true}
                animation={"none"}
                navButtonsAlwaysVisible={true}
                stopAutoPlayOnHover={true}
                cycleNavigation={false}
              >
                {item.property_pictures.map((pic, index) =>
                  <ImgElement
                    key={index}
                    src={pic}
                    alt='Stock Listing Image'
                    sx={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Carousel>
            </CardMedia>
            <CardContent>
              <Stack direction='row' justifyContent='space-between' alignItems={'center'} spacing={1}>
                <Stack>
                  <Typography variant='body' >
                    {fullAddress(
                      item.property_street_number,
                      item.property_street_name,
                      item.property_street_type,
                      item.property_suburb,
                      item.property_state
                    )}
                  </Typography>
                  <Typography variant='body2'>{item.property_type}</Typography>
                </Stack>
                <IconButton size='small' aria-label='bookmark' >
                  <Bookmark />
                </IconButton>
              </Stack>
              <Stack direction='row' spacing={2}>
                <Stack direction={'row'} spacing={1} alignItems={"center"}>
                  <Stack direction='row' spacing={0.5} alignItems={"center"}>
                    <BedIcon />
                    <Typography alignContent="center" fontWeight={700} variant='h6'>
                      {item.property_bedroom_count}
                    </Typography>
                  </Stack>
                  <Divider orientation='vertical' />
                  <Stack direction='row' spacing={0.5} alignItems={"center"}>
                    <BathtubIcon />
                    <Typography alignContent="center" fontWeight={700} variant='h6'>
                      {item.property_bathroom_count}
                    </Typography>
                  </Stack>
                  <Divider orientation='vertical' />
                  <Stack direction='row' spacing={0.5} alignItems={"center"}>
                    <DirectionsCarIcon />
                    <Typography alignContent="center" fontWeight={700} variant='h6'>
                      {item.property_car_spot_count}
                    </Typography>
                  </Stack>
                  <Divider orientation='vertical' />
                  <Stack direction='row' spacing={0.2} alignItems={"center"}>
                    <SquareFoot />
                    <Typography alignContent="center" fontWeight={700} variant='body'>
                      {item.property_footprint}m<sup>2</sup>
                    </Typography>
                  </Stack>

                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>)}
      </Grid> : <NoPropertiesFound />}
      
    </Box>
    </NavigationMenu>
  )
}
