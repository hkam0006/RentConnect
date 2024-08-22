import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Grid, Container, Card, CardMedia, CardContent, Typography, Button, Skeleton, Paper, InputBase,Divider, IconButton, Chip} from '@mui/material';
import HouseIcon from '@mui/icons-material/House';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import { supabase } from '../supabase';



const fullAddress = (p) => {
  return `${p.property_street_number} ${p.property_street_name}, ${p.property_suburb}, ${p.property_state} ${p.property_postcode}`;
};

const PropertyCard = ({loading, property}) => {
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
          onClick={() => {
            navigate("/LogIn")
          }}
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

const ChipContainer = ({chips, setChips, onDeleteChip}) => {
  
  const handleDelete = (chipToDelete) => () => {
    setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  if (chips.length === 0) return <></>

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'start',
        padding: 1,
        mt: 2,
        boxShadow: 0,
        borderRadius: 5,
        gap: 1,
        flexWrap: "wrap"
      }}
    >
      {chips.map((data) => {
        return (
          <Chip
            key={data}
            label={data}
            size='small'
            onDelete={handleDelete(data)}
          />
        )
      })}
    </Paper>
  )
}



const SearchPropertyFilter = ({onSearch, value, onChange, handleSubmit}) => {
  return(
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "60%", margin: "auto", borderRadius: 3, minWidth: "300px", mt: 2 }}
    >
      <Box sx={{ p: '10px', display: "flex", alignItems: "center" }}>
        <HouseIcon color='primary' aria-label="menu"/>
      </Box>
      <InputBase  
        sx={{ ml: 1, flex: 1 }} 
        value={value}
        autoFocus
        placeholder="Search region, suburb or postcode" 
        inputProps={{ 'aria-label': 'search suburb' }}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter' ){
            ev.preventDefault()
            handleSubmit(ev)
          }
        }}
      />
      <IconButton sx={{ p: '10px' }} aria-label="search" onClick={(e) => handleSubmit(e)}>
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" >
        <FilterAltIcon />
      </IconButton>
    </Paper>
  )
}

const SkeletonProperties = () => {
  return <>
    {Array.from(Array(6)).map((key) => <Grid key={key} item xs={12} sm={6} md={4}>
      <PropertyCard key={key} loading={true} />
    </Grid>)}
  </>
}

const ActualProperties = ({properties}) => {
  properties.map((x) => console.log(x))
  return (
    <>
      {properties.map((p) => {
        return (
          <Grid key={p.property_id} item xs={12} sm={6} md={4}>
            <PropertyCard key={p.property_id} loading={false} property={p}/>
          </Grid>
        )
      })}
    </>
  )
}

const PublicPropertyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("")
  const [chips, setChips] = useState([searchParams.get("q")])
  const [properties, setProperties] = useState([])

  const handleFilterSubmit = () => {
    setChips((prev) => [...prev, search])
    setSearch("")
  }

  useEffect(() => {
    setLoading(true)
    async function findProperties(queries){
      const { data, error } = await supabase
        .from('PROPERTY')  // Replace 'properties' with your table name
        .select('*')
        .or(
          `property_suburb.in.(${queries.join(',')}), property_postcode.in.(${queries.join(',')}), property_state.in.(${queries.join(',')})`
        )
      if (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
        return setProperties([])
      }
      setLoading(false)
      return setProperties(data)
    }

    setTimeout(() => {
      findProperties(chips)
    }, 2000)

  }, [chips])

  return (
    <Box sx={{height: "100vh", py: 1}}>
      <Container>
        <SearchPropertyFilter 
          value={search} 
          onChange={setSearch} 
          handleSubmit={handleFilterSubmit}
        />  
        <ChipContainer chips={chips} setChips={setChips}/>
        <Grid container spacing={2} mt={1}>
          {loading || properties.length === 0 ? <SkeletonProperties /> : <ActualProperties properties={properties}/>}
        </Grid>
      </Container>
    </Box>
  )
}


export default PublicPropertyPage
