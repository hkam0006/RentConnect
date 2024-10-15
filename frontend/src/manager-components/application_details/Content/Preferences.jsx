import { useParams } from 'react-router-dom'
import { Typography, Grid, Paper, Alert } from '@mui/material'
import useGetApplicationsByID from '../../../queries/Application/useGetApplicationsByID'

import ContentTitle from './ContentTitle'
import AppLoader from '../../property_page/AppLoader'

function Preferences({ handleCommentsClick }) {
    const { companyId, propertyId, renterId } = useParams()
    const { application, loading } = useGetApplicationsByID(companyId, propertyId, renterId)
    
    if (loading) {
        return <AppLoader />
    } else if (!application) {
        return (
            <Paper sx={{ padding: 2 }} elevation={10} id="PreferencesPaper">
                <ContentTitle content={'Preferences'} handleCommentsClick={handleCommentsClick} />
                <Alert severity='error' sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                    No application found
                </Alert>
            </Paper>
        )
    } else {
        return (
            <Paper sx={{ padding: 2 }} elevation={10} id="PreferencesPaper">
                <ContentTitle content={'Preferences'} handleCommentsClick={handleCommentsClick} />
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
}

export default Preferences