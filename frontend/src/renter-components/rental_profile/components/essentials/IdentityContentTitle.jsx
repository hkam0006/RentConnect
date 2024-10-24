import { Typography, Grid, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

function IdentityContentTitle({ title, addOnClick }) {
    return (
        <Grid container alignItems='center'>
        <Grid item xs={6}>
            <Typography variant='h6'>{title}</Typography>
        </Grid>
        <Grid item xs={6} container justifyContent='flex-end'>
            <Button variant='contained' color='primary' onClick={addOnClick}>
                <AddIcon />
            </Button>
        </Grid>
    </Grid>
    )
}

export default IdentityContentTitle