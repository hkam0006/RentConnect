import { Box, Typography, Grid, Button, Divider } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

function PetsCard({ pet }) {
    return (
        <Box>
            <Box paddingBottom={2}>
                <Divider/>
            </Box>
            <Grid container alignItems='center'>
                <Grid item xs={10}>
                    <Typography variant='h6'>{pet.pet_name} ({pet.pet_species})</Typography>
                    <Typography variant='body1'>{String(pet.pet_age)} y/o{pet.pet_indoors_status ? ', ' + pet.pet_indoors_status : '' }</Typography>
                    <Typography variant='body1'>Desexed: {pet.pet_is_dexed ? 'Yes' : 'No'}</Typography>
                    <Typography variant='body1'>Microchip Number: {pet.pet_microchip_number ? pet.pet_microchip_number : 'Not Microchipped'}</Typography>
                    <Typography variant='body1'>Registration Number: {pet.pet_registration_number ? pet.pet_registration_number : 'Not Registered'}</Typography>
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

export default PetsCard