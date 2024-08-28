import React from 'react'
import { Typography, Grid, Paper } from '@mui/material'

import ContentTitle from './ContentTitle'

function Preferences({ application, verified, handleVerification, handleCommentsClick }) {
    return (
        <Paper sx={{ padding: 2 }} elevation={10} id="PreferencesPaper">
            <ContentTitle 
                content={'Preferences'} 
                verified={verified} 
                handleVerification={handleVerification} 
                handleCommentsClick={handleCommentsClick}
            />
            <Grid container alignItems='center' paddingTop={2}>
                <Grid item xs={4}>
                    <Typography variant='body1' color='text.secondary'>Rent</Typography>
                    <Typography variant='body1'>{application.application_rent_preference ? application.application_rent_preference + '/w' : 'unspecified'}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='body1' color='text.secondary'>Term</Typography>
                    <Typography variant='body1'>{application.application_term} months</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='body1' color='text.secondary'>Lease Start</Typography>
                    <Typography variant='body1'>{new Date(application.application_lease_start).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</Typography>
                </Grid>
            </Grid>
            <Grid container alignItems='center' paddingTop={2}>
                <Grid item xs={4}>
                    <Typography variant='body1' color='text.secondary'>Adults</Typography>
                    <Typography variant='body1'>{application.application_adults_number}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='body1' color='text.secondary'>Children</Typography>
                    <Typography variant='body1'>{application.application_children_number}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='body1' color='text.secondary'>Pets</Typography>
                    <Typography variant='body1'>{application.application_pets_number}</Typography>
                </Grid>
            </Grid>
            <Typography variant='body1' color='text.secondary' paddingTop={2}>Details & Requests:</Typography>
            <Typography variant='body1'>{application.application_details ? application.application_details : 'No extra details provided'}</Typography>
        </Paper>
    )
}

export default Preferences