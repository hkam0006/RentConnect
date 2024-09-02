import { Box, Typography, Grid, Button, Divider } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

function PreviousTenancyCard({ previousTenancy }) {
    return (
        <Box>
            <Box paddingBottom={2}>
                <Divider/>
            </Box>
            <Grid container alignItems='center'>
                <Grid item xs={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography>Address:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>{previousTenancy.previous_tenancy_address}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Contact Name:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>{previousTenancy.previous_tenancy_contact_name}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Contact Email:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>{previousTenancy.previous_tenancy_contact_email}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Contact Phone:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>{previousTenancy.previous_tenancy_contact_phone}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2} container justifyContent='flex-end'>
                    <Button variant='contained' color='primary'>
                        <EditIcon />
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default PreviousTenancyCard