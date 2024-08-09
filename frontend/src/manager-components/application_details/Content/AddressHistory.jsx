import React from 'react'
import { Typography, Grid, Paper, Box, Divider } from '@mui/material'

import ContentTitle from './ContentTitle'

function AddressHistory({ renterTenancy, verified, handleVerification, handleCommentsClick }) {
    return (
        <Paper sx={{ padding: 2, marginTop: '30px' }} elevation={10} id='AddressHistoryPaper'>
            <ContentTitle 
                content={'Address History'} 
                verified={verified} 
                handleVerification={handleVerification} 
                handleCommentsClick={handleCommentsClick}
            />
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
                    <Typography variant='body1'>{renterTenancy.previous_tenancy_contact_phone ? renterTenancy.previous_tenancy_contact_phone : 'None provided'}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='body1' color='text.secondary'>Email</Typography>
                    <Typography variant='body1'>{renterTenancy.previous_tenancy_contact_email ? renterTenancy.previous_tenancy_contact_email : 'None provided'}</Typography>
                </Grid>
            </Grid>
            <Typography variant='body1' color='text.secondary' paddingTop={2}>Comments</Typography>
            <Typography variant='body1' paddingBottom={1}></Typography>
        </Paper>
    )
}

export default AddressHistory

/**
 *  Additional form for address history?
<Typography variant='body1' color='text.secondary'>Questions</Typography>
<Grid container alignItems='center' paddingBottom={2}>
    <Grid xs={6}>
        <Typography variant='body1'>Pleasantness:</Typography>
    </Grid>
    <Grid item xs={6} container justifyContent='flex-end'>
        {[...Array(5)].map((_, index) => (
            <React.Fragment>
                {index < applicantData.addressHistory.PleasantnessRating ? <Star color='primary' style={{ width: '32px', height: '32px' }}/> : <StarBorder color='primary' style={{ width: '32px', height: '32px' }}/>}
            </React.Fragment>
        ))}
    </Grid>
</Grid>

<Grid container alignItems='center' paddingBottom={2}>
    <Grid xs={6}>
        <Typography variant='body1'><Typography variant='body1'>Cares about the property:</Typography></Typography>
    </Grid>
    <Grid item xs={6} container justifyContent='flex-end'>
        {[...Array(5)].map((_, index) => (
            <React.Fragment>
                {index < applicantData.addressHistory.PropertyCareRating ? <Star color='primary' style={{ width: '32px', height: '32px' }}/> : <StarBorder color='primary' style={{ width: '32px', height: '32px' }}/>}
            </React.Fragment>
        ))}
    </Grid>
</Grid>

<Grid container alignItems='center' paddingBottom={2}>
    <Grid xs={8}>
        <Typography variant='body1'><Typography variant='body1'>Would you rent the property_page again?</Typography></Typography>
    </Grid>
    <Grid item xs={4} container justifyContent='flex-end'>
        {applicantData.addressHistory.Recommended ? (
            <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
        ) : (
            <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
        )}
    </Grid>
</Grid>

<Grid container alignItems='center' paddingBottom={2}>
    <Grid xs={8}>
        <Typography variant='body1'><Typography variant='body1'>Were there deductions to the bond?</Typography></Typography>
    </Grid>
    <Grid item xs={4} container justifyContent='flex-end'>
        {applicantData.addressHistory.BondDeductions ? (
            <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
        ) : (
            <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
        )}
    </Grid>
</Grid>

<Grid container alignItems='center' paddingBottom={2}>
    <Grid xs={8}>
        <Typography variant='body1'><Typography variant='body1'>Did the property_page pay rent on time?</Typography></Typography>
    </Grid>
    <Grid item xs={4} container justifyContent='flex-end'>
        {applicantData.addressHistory.OnTimePayments ? (
            <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
        ) : (
            <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
        )}
    </Grid>
</Grid>

<Grid container alignItems='center' paddingBottom={2}>
    <Grid xs={8}>
        <Typography variant='body1'><Typography variant='body1'>Were repair and maintenance requests reasonable?</Typography></Typography>
    </Grid>
    <Grid item xs={4} container justifyContent='flex-end'>
        {applicantData.addressHistory.ReasonableRequests ? (
            <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
        ) : (
            <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
        )}
    </Grid>
</Grid>

<Grid container alignItems='center' paddingBottom={2}>
    <Grid xs={8}>
        <Typography variant='body1'><Typography variant='body1'>Were pets kept on the property without permission?</Typography></Typography>
    </Grid>
    <Grid item xs={4} container justifyContent='flex-end'>
        {applicantData.addressHistory.UnpermittedPets ? (
            <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
        ) : (
            <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
        )}
    </Grid>
</Grid>

<Grid container alignItems='center' paddingBottom={2}>
    <Grid xs={8}>
        <Typography variant='body1'><Typography variant='body1'>Were pets kept on the property without permission?</Typography></Typography>
    </Grid>
    <Grid item xs={4} container justifyContent='flex-end'>
        {applicantData.addressHistory.UnpermittedPets ? (
            <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
        ) : (
            <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
        )}
    </Grid>
</Grid>

<Grid container alignItems='center' paddingBottom={2}>
    <Grid xs={8}>
        <Typography variant='body1'><Typography variant='body1'>Did you receive any complaints during the tenancy?</Typography></Typography>
    </Grid>
    <Grid item xs={4} container justifyContent='flex-end'>
        {applicantData.addressHistory.ComplaintsReceived ? (
            <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
        ) : (
            <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
        )}
    </Grid>
</Grid>

<Grid container alignItems='center' paddingBottom={2}>
    <Grid xs={8}>
        <Typography variant='body1'><Typography variant='body1'>Did the property_page leave the property in a reasonable condition?</Typography></Typography>
    </Grid>
    <Grid item xs={4} container justifyContent='flex-end'>
        {applicantData.addressHistory.ReasonablePropertyCondition ? (
            <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
        ) : (
            <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
        )}
    </Grid>
</Grid>

<Grid container alignItems='center' paddingBottom={2}>
    <Grid xs={8}>
        <Typography variant='body1'><Typography variant='body1'>Did you expect the property_page to terminate the tenancy?</Typography></Typography>
    </Grid>
    <Grid item xs={4} container justifyContent='flex-end'>
        {applicantData.addressHistory.ExpectedTermination ? (
            <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
        ) : (
            <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
        )}
    </Grid>
</Grid>

<Grid container alignItems='center' paddingBottom={2}>
    <Grid xs={8}>
        <Typography variant='body1'><Typography variant='body1'>Did you expect the bond claim to be fully claimed?</Typography></Typography>
    </Grid>
    <Grid item xs={4} container justifyContent='flex-end'>
        {applicantData.addressHistory.FullBondClaim ? (
            <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
        ) : (
            <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
        )}
    </Grid>
</Grid>
 */