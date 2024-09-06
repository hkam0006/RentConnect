import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Modal, Grid, Container, Card, CardMedia, CardContent, Typography, Button, Skeleton, Paper, InputBase,Divider, IconButton, Chip, Menu, MenuItem, AppBar, Toolbar, Stack, Dialog, DialogTitle, DialogContent} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HouseIcon from '@mui/icons-material/House';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import { supabase } from '../supabase';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BathtubIcon from '@mui/icons-material/Bathtub';
import KingBedIcon from '@mui/icons-material/KingBed';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CloseIcon from '@mui/icons-material/Close';
import ImageCarousel from '../manager-components/property_page/ImageCarousel';

const fullAddress = (p) => {
  return `${p.property_street_number} ${p.property_street_name}, ${p.property_suburb}, ${p.property_state} ${p.property_postcode}`;
};

const PropertyCard = ({loading, property, showModal}) => {
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
          onClick={showModal}
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
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80%", margin: "auto", borderRadius: 3, minWidth: "300px", mt: 2 }}
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

const ActualProperties = ({properties, setShowModal}) => {
  return (
    <>
      {properties.map((p) => {
        return (
          <Grid key={p.property_id} item xs={12} sm={6} md={4}>
            <PropertyCard key={p.property_id} loading={false} property={p} showModal={() => setShowModal(p)}/>
          </Grid>
        )
      })}
    </>
  )
}

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography fontWeight={700} variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RentConnect
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Button color="inherit" onClick={() => navigate("/Landing")} >Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Properties</Button>
          <Button color="inherit">Contact</Button>
          <Button color="inherit" variant='outlined' size='small' onClick={() => navigate("/LogIn")}>Log In</Button>
        </Box>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'block', md: 'none' } }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuItem onClick={handleMenuClose}>Home</MenuItem>
          <MenuItem onClick={handleMenuClose}>About</MenuItem>
          <MenuItem onClick={handleMenuClose}>Properties</MenuItem>
          <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
          <MenuItem onClick={handleMenuClose}>Login</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

const PropertyDetailsModal = ({open, onClose}) => {
  const property = open;
  const navigate = useNavigate();
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {property.property_type} in {property.property_suburb}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {/* <CardMedia
          component="img"
          height="400"
          image={property.property_pictures[0]}
          alt={property.property_id}
        /> */}
        <ImageCarousel images={property.property_pictures} style_props={{height: "400px", objectFit: "cover"}}/>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            <LocationOnIcon sx={{ mr: 1 }} />
            {fullAddress(property)}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${property.property_rent} {property.property_rent_frequency}
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" component="h2" gutterBottom>
              Property Description
            </Typography>
            <Typography variant="body1" gutterBottom>
              {property.property_description}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h6" component="h2" gutterBottom>
                Features
              </Typography>
              <Typography variant="body2" gutterBottom>
                <KingBedIcon sx={{ mr: 1 }} />
                {property.property_bedroom_count} Bedrooms
              </Typography>
              <Typography variant="body2" gutterBottom>
                <BathtubIcon sx={{ mr: 1 }} />
                {property.property_bathroom_count} Bathrooms
              </Typography>
              <Typography variant="body2" gutterBottom>
                <AspectRatioIcon sx={{ mr: 1 }} />
                {property.property_footprint}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="contained" color="primary" size="large" onClick={() => navigate('/LogIn')}>
            Apply Now!
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

const PublicPropertyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("")
  const [chips, setChips] = useState([searchParams.get("q")])
  const [showDetails, setShowDetails] = useState(null)
  const [properties, setProperties] = useState([])

  const setShowModal = (property) => {
    setShowDetails(property)
  }

  const handleFilterSubmit = () => {
    setChips((prev) => [...prev, search])
    setSearch("")
  }

  useEffect(() => {
    setLoading(true)
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

    setTimeout(() => {
      findProperties(chips)
    }, 2000)

  }, [chips])

  return (<>
    { Boolean(showDetails) && <PropertyDetailsModal open={showDetails} onClose={() => setShowDetails(null)}/>}
    <Box sx={{height: "100vh", pb: 1}}>
      <Navbar />
      <Container>
        <SearchPropertyFilter 
          value={search} 
          onChange={setSearch} 
          handleSubmit={handleFilterSubmit}
        />  
        <ChipContainer chips={chips} setChips={setChips}/>
        <Grid container spacing={2} mt={1}>
          {loading  ? <SkeletonProperties /> : <ActualProperties properties={properties} setShowModal={setShowModal}/>}
          {properties.length === 0 && !loading && <Stack sx={{textAlign: "center", width: "100%", mt: 3}}>
              <Typography variant='h6'>Can't find any properties that match your query</Typography>
            </Stack>
          }
        </Grid>
      </Container>
    </Box>
    </>
  )
}


export default PublicPropertyPage
