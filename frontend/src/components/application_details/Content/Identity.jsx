import React from 'react'
import { Paper } from '@mui/material'

import ContentTitle from './ContentTitle'

function Identity({ identity, verified, handleVerification, handleCommentsClick }) {
    return (
        <Paper sx={{ padding: 2, marginTop: '30px' }} elevation={10} id='IdentityPaper'>
            <ContentTitle 
                content={'Identity'} 
                verified={verified} 
                handleVerification={handleVerification} 
                handleCommentsClick={handleCommentsClick}
            />
        </Paper>
    )
}

export default Identity

/**
 * Handing different identity forms?
{applicantData.identity.identity && Object.keys(applicantData.identity.identity).map((key, index) => {
                        switch (key) {
                            case 'DriverLicence':
                                return (
                                    <Box>
                                        <Box paddingTop={1} paddingBottom={1}>
                                            <Divider />
                                        </Box>
                                        <Typography variant='h6' paddingBottom={1}>Drivers Licence</Typography>
                                        <Grid container>
                                            <Grid item xs={3}>
                                                <Typography variant='body1' color='text.secondary'>Number</Typography>
                                                <Typography variant='body1'>{applicantData.identity.identity.DriverLicence.documents.Number}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant='body1' color='text.secondary'>Expiry Date</Typography>
                                                <Typography variant='body1'>{applicantData.identity.identity.DriverLicence.documents.Expiry.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant='body1' color='text.secondary'>Date of Birth</Typography>
                                                <Typography variant='body1'>{applicantData.identity.identity.DriverLicence.documents.DoB.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>

                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant='body1' color='text.secondary'>State</Typography>
                                                <Typography variant='body1'>{applicantData.identity.identity.DriverLicence.documents.State}</Typography>

                                            </Grid>
                                        </Grid>                                            
                                    </Box>
                                )
                            case 'Passport':
                                return (
                                    <Box>
                                        <Box paddingTop={1} paddingBottom={1}>
                                            <Divider />
                                        </Box>
                                        <Typography variant='h6' paddingBottom={1}>Passport</Typography>
                                    </Box>
                                )
                            default:
                                return (
                                    <Box></Box>
                                )
                        }
                    })}
                </Paper>
 */