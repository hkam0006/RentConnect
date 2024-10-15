import { useParams } from 'react-router-dom'
import { Typography, Grid, Paper, Box, Divider, Alert } from '@mui/material'

import useGetPreviousTenanciesByRenterID from '../../../queries/Previous Tenancy/useGetPreviousTenanciesByRenterID'

import ContentTitle from './ContentTitle'

function AddressHistory({ handleCommentsClick }) {
    const { renterId } = useParams()
    const { previousTenancies, loading } = useGetPreviousTenanciesByRenterID(renterId)

    if (loading) {
        return <></>
    } else if (!previousTenancies || previousTenancies.length === 0) {
        return (
            <Paper sx={{ padding: 2, marginTop: '30px' }} elevation={10} id='AddressHistoryPaper'>
                <ContentTitle content={'Address History'} handleCommentsClick={handleCommentsClick} />
                <Alert severity='error' sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                    No previous address histories found
                </Alert>
            </Paper>
        )
    } else {
        return (
            <Paper sx={{ padding: 2, marginTop: '30px' }} elevation={10} id='AddressHistoryPaper'>
                <ContentTitle content={'Address History'} handleCommentsClick={handleCommentsClick} />
                {previousTenancies.map((renterTenancy, index) => (
                    <Box key={index}>
                        <Typography variant='h6' paddingTop={2}>{renterTenancy.previous_tenancy_address}</Typography>
                        <Box paddingTop={1}>
                            <Divider />
                        </Box>
                        <Grid container alignItems='center' paddingTop={2}>
                            <Grid item xs={4}>
                                <Typography variant='body1' color='text.secondary'>Contact Name</Typography>
                                <Typography variant='body1'>{renterTenancy.previous_tenancy_contact_name}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='body1' color='text.secondary'>Phone</Typography>
                                <Typography variant='body1'>{renterTenancy.previous_tenancy_contact_phone || 'None provided'}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='body1' color='text.secondary'>Email</Typography>
                                <Typography variant='body1'>{renterTenancy.previous_tenancy_contact_email || 'None provided'}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
            </Paper>
        )
    }
}

export default AddressHistory
