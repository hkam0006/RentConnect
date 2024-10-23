import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Stack,TextField,Typography,Paper,IconButton, Grid, AppBar, Toolbar } from '@mui/material'
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import HouseIcon from '@mui/icons-material/House';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SearchPropertyBar = ({onSearch, value, onChange}) => {
  return(
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "60%", margin: "auto", borderRadius: 3, minWidth: "300px" }}
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
      />
      <IconButton sx={{ p: '10px' }} aria-label="search" onClick={() => onSearch()}>
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <FilterAltIcon />
      </IconButton>
    </Paper>
  )
}

const LandingPage = () => {
  const [search, setSearch] = useState("")
  const isAuth = Boolean(useSelector(state => state.user.currentUser))
  const navigate = useNavigate()
  const HeroSection = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: "#4158D0",
    backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
    color: '#fff',
    textAlign: 'center',
  });

  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard")
    }
  }, [isAuth])

  return (
      <div>
        <Box sx={{position: "fixed", width: "100%", py: 2}}>
          <Container>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <Stack direction='row'>
                <Typography variant='h5' fontWeight={700} color='primary' >Rent</Typography>
                <Typography variant='h5' fontWeight={700} >Connect</Typography>
              </Stack>
              <Stack direction='row' gap={2}>
                <Button variant='outlined' sx={{borderRadius: 1.5}} onClick={() => navigate("/LogIn")}>Sign In</Button>
                <Button variant="contained" sx={{borderRadius: 1.5}} onClick={() => navigate("/SignUp")}>Join</Button>
              </Stack>
            </Box>
          </Container>
        </Box>
      
        {/* Hero Section */}
        <HeroSection>
          <Container>
            <Typography fontWeight={700} sx={{typography: {xs: "h4", md: "h3"}}} gutterBottom>
              Manage Rentals Effortlessly with RentConnect
            </Typography>
            <Typography sx={{typography: { sm: "body1", md: "p"}, mb: 2}} component="p" gutterBottom>
              Streamline your rental management with ease.
            </Typography>
            <SearchPropertyBar
              onSearch={() => navigate(`/LandingSearch?q=${search}`)}
              value={search}
              onChange={setSearch}
            />
          </Container>
        </HeroSection>
    </div>
  )
}
export {SearchPropertyBar} 
export default LandingPage
