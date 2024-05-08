import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { List, ListItem, Typography, Grid, Paper, Button, TextField, Box, Divider } from '@mui/material'
import { LinearProgress } from '@mui/material';

function RentalProfile () {
    const ProfileCompletion = () => {
        return (
            <Paper sx={{ padding: '3% 10%', marginTop: '30px' }}>
                <Typography variant='h4'>Your Rental Profile</Typography>
                <Grid container alignItems='center' paddingTop={2}>
                    <Grid item xs={2}>
                        <Typography variant='h4'>20%</Typography>
                    </Grid>
                    <Grid item xs={10} sx={{ padding: 2 }}>
                        <LinearProgress variant='determinate' value={20} style={{ borderRadius: '10px', height: '40px' }}/>
                    </Grid>
                </Grid>
                <Box paddingTop={2}>
                    <Link to={`/`} display="flex">
                        <Button variant='contained' color='primary' sx={{ width: '100%', height: '50px' }}>
                            Finish Building Your Profile
                        </Button>
                    </Link>
                </Box>
                
            </Paper>
        )
    }

    const ApplyAnywhere = () => {
        return (
            <Paper sx={{ padding: '3% 10%', marginTop: '30px' }}>
                <Typography variant='h4'>Apply Anywhere</Typography>
                <Typography variant='body1' paddingTop={2}>Re-use your Rent Connect Profile and apply for any property</Typography>
                <Box paddingTop={2}>
                    <Link to={`/`} display="flex">
                        <Button variant='contained' color='primary' sx={{ width: '100%', height: '50px' }}>
                            Apply Anywhere
                        </Button>
                    </Link>
                </Box>
            </Paper>
            
        )
    }

    const RentalApplications = () => {
        return (
            <Paper sx={{ padding: '3% 10%', marginTop: '30px' }}>
                <Typography variant='h4'>Your Rental Applications</Typography>
                <Typography variant='body1' paddingTop={2}>You currently have no applications in progress</Typography>
            </Paper>
        )
    }

    return (
        <Box display="flex" justifyContent="center">
            <Box margin={2} sx={{ width: '50%' }} >
                <ProfileCompletion />
                <ApplyAnywhere />
                <RentalApplications />
            </Box>
        </Box>
    )
}

export default RentalProfile