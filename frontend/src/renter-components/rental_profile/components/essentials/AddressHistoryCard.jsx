import { useState } from 'react'
import { Box, Typography, Grid, Button, Divider } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddressHistoryDialog from '../Dialogs/AddressHistoryDialog'

function PreviousTenancyCard({ previousTenancy }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    function closeDialog() {
        setIsDialogOpen(false)
    }

    return (
        <>
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
                        <Button variant='contained' color='primary' onClick={() => setIsDialogOpen(true)}>
                            <EditIcon/>
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {isDialogOpen && <AddressHistoryDialog addressHistory={previousTenancy} closeDialog={closeDialog} isUpdate={true}/>}
        </>
    )
}

export default PreviousTenancyCard