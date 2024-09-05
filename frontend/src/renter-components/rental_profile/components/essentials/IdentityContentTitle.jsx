import { Typography, Grid, Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

function IdentityContentTitle({ title, addOnClick, hasIdentity }) {
    return (
        <Grid container alignItems='center'>
        <Grid item xs={6}>
            <Typography variant='h6'>{title}</Typography>
        </Grid>
        <Grid item xs={6} container justifyContent='flex-end'>
            <Box>
                {(!hasIdentity) && (
                    <Button variant='contained' color='primary' onClick={addOnClick}>
                    <AddIcon />
                </Button>
                )}
            </Box>
        </Grid>
    </Grid>
    )
}

export default IdentityContentTitle