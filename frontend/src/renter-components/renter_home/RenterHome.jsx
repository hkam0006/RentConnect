import React, { useEffect, useState } from 'react'
import { Box, Modal, Grid, Container, Card, CardMedia, CardContent, Typography, Button, Skeleton, Paper, InputBase,Divider, IconButton, Chip, Menu, MenuItem, AppBar, Toolbar, Stack, Dialog, DialogTitle, DialogContent} from '@mui/material';
import NavigationMenu from '../navigation_menu/NavigationMenus';
import { supabase } from '../../supabase';
import {PropertyStatCards} from "../../manager-components/property_page/PropertyStatCards";
import {PropertySearch} from "../../manager-components/property_page/PropertySearch";
import {PropertiesTable} from "../../manager-components/property_page/PropertiesTable";
import ApplicationsTable from "./ApplicationsTable";
import useGetApplicationsByCompanyID from "../../queries/Application/useGetApplicationsByCompanyID";
import AppLoader from "../../manager-components/property_page/AppLoader";
import useGetApplicationsByRenterID from "../../queries/Application/useGetApplicationsByRenterID";
import useGetPropertiesByCompanyID from "../../queries/Property/useGetPropertiesByCompanyID";
import useGetUserID from "../../queries/useGetUserID";
import useGetRenterByRenterID from "../../queries/Renter/useGetRenterByRenterID";
import SearchPropertyFilter from './SearchPropertyFilter';
import ChipContainer from './ChipContainer';
import { useNavigate } from 'react-router-dom';

const fullAddress = (p) => {
  return `${p.property_street_number} ${p.property_street_name}, ${p.property_suburb}, ${p.property_state} ${p.property_postcode}`;
};

const PropertyCard = ({loading, property, viewProperty}) => {
  const navigate = useNavigate();
  return <>
    {!loading ? <Card sx={{ borderRadius: 0, boxShadow: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={property.property_pictures[0]}
        // alt={property.title}
      />
      <CardContent>
        <Typography variant="subtitle" component="div">
          {fullAddress(property)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.property_type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${property.property_rent} {property.property_rent_frequency}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }} 
          onClick={viewProperty}
        >
          View Details
        </Button>
      </CardContent>
    </Card> : <Box sx={{height: "100%"}}>
        <Skeleton animation="wave"  height={200} variant='rectangular' width={"100%"}/>
        <Skeleton animation="wave"  height={50} width={"100%"}/>
        <Skeleton animation="wave"  height={20} width={"50%"}/>
        <Skeleton animation="wave" height={20} width={"20%"}/>
        <Skeleton animation="wave" height={70} width={"100%"}/>
      </Box>
    }
  </>
}

const ActualProperties = ({properties, setShowModal}) => {
  const navigate = useNavigate()
  return (
    <>
      {properties.map((p) => {
        return (
          <Grid key={p.property_id} item xs={12} sm={6} md={4}>
            <PropertyCard key={p.property_id} loading={false} property={p} viewProperty={() => navigate(`/application/${p.property_id}`)}/>
          </Grid>
        )
      })}
    </>
  )
}

const SkeletonProperties = () => {
  return <>
    {Array.from(Array(6)).map((key, index) => {
      return <Grid key={index} item xs={12} sm={6} md={4}>
        <PropertyCard key={key} loading={true} />
      </Grid>
    })}
  </>
}

export default function RenterHome() {

    const {userID, loading: userLoading} = useGetUserID();
    const {renter, loading: renterLoading} = useGetRenterByRenterID(userID);
    const {applications, loading: applicationsLoading} = useGetApplicationsByRenterID(userID);

    const [loading, setLoading] = useState(true)
    const [properties, setProperties] = useState([])
    const [chips, setChips] = useState([])
    const [search, setSearch] = useState("")


    const handleFilterSubmit = () => {
      setChips((prev) => [...prev, search])
      setSearch("")
    }

    useEffect(() => {
      async function findProperties(queries){
        const joint_q = queries.join(" ")
        const { data, error } = await supabase
          .from('PROPERTY') 
          .select('*')
          .or(`property_suburb.ilike.%${joint_q}%, property_postcode.ilike.%${joint_q}%, property_state.ilike.%${joint_q}%`)
        if (error) {
          console.error('Error fetching data:', error)
          setLoading(false)
          return setProperties([])
        }
        setLoading(false)
        return setProperties(data)
      }

      findProperties(chips)
    }, [chips])

    if (userLoading || renterLoading || applicationsLoading) return <AppLoader />

    return (
        <NavigationMenu>
            <div style={{padding: "20px", marginTop: "64px"}}>
                <Typography variant='h4' fontWeight={700} color="text.primary">Welcome {(renter.length > 0) ? renter[0].renter_first_name : 'User'}!</Typography>
                <Typography variant='h6' fontWeight={700} color="text.secondary">You have 2 new messages.</Typography>

                <Paper sx={{ mt: 2, borderRadius: 3 }} elevation={3}>
                    <Typography variant='h5' fontWeight={700} color="text.primary" style={{paddingLeft: '15px', paddingTop: '10px'}}>Current Applications</Typography>
                    <ApplicationsTable applications={applications}/>
                </Paper>

                <Paper sx={{mt: 2, borderRadius: 3}} elevation={3}>
                  <Typography variant='h5' fontWeight={700} color="text.primary" style={{paddingLeft: '15px', paddingTop: '10px'}}>Find Properties</Typography>
                  <SearchPropertyFilter 
                    value={search}
                    onChange={setSearch}
                    handleSubmit={handleFilterSubmit}
                  />
                  <ChipContainer chips={chips} setChips={setChips}/>
                  <Grid container spacing={2} mt={1} pl={2} pr={2} pb={2}>
                    {loading  ? <SkeletonProperties /> : <ActualProperties properties={properties}/>}
                    {properties.length === 0 && !loading && <Stack sx={{textAlign: "center", width: "100%", mt: 3}}>
                        <Typography variant='h6'>Can't find any properties that match your query</Typography>
                      </Stack>
                    }
                  </Grid>
                </Paper>
            </div>
        </NavigationMenu>
    )
}
