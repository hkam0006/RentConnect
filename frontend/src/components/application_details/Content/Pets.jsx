import React from 'react'
import { Paper } from '@mui/material'

import ContentTitle from './ContentTitle'
import PetsContentCard from './PetsContent/PetsContentCard'

function Pets({ renterPet, verified, handleVerification, handleCommentsClick }) {
    return (
        <Paper sx={{ padding: 2, marginTop: '30px' }} elevation={10} id='PetsPaper'>
            <ContentTitle 
                content={'Pets'} 
                verified={verified} 
                handleVerification={handleVerification} 
                handleCommentsClick={handleCommentsClick}
            />
            {renterPet.map((pet, index) =>
                <PetsContentCard key={`pet-${index}`} pet={pet} />
            )}
        </Paper>
    )
}

export default Pets
