import React from 'react'
import { Paper, Typography } from '@mui/material'

function PetsContentCard({ pet }) {
    return (
        <Paper sx={{ padding: 2, marginTop: '20px', backgroundColor: '#DBCCE5' }}>
            <Typography variant='h6'>{pet.pet_name} ({pet.pet_species})</Typography>
            <Typography variant='body1'>{String(pet.pet_age)} y/o{pet.pet_indoors_status ? ', ' + pet.pet_indoors_status : '' }</Typography>
            <Typography variant='body1'>Desexed: {pet.pet_is_dexed ? 'Yes' : 'No'}</Typography>
            <Typography variant='body1'>Microchip Number: {pet.pet_microchip_number ? pet.pet_microchip_number : 'Not Microchipped'}</Typography>
            <Typography variant='body1'>Registration Number: {pet.pet_registration_number ? pet.pet_registration_number : 'Not Registered'}</Typography>
        </Paper>
    )
}

export default PetsContentCard
