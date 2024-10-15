import { useParams } from 'react-router-dom'
import { Paper, Alert } from '@mui/material'

import useGetPetsByRenterID from '../../../queries/Pet/useGetPetsByRenterID'

import ContentTitle from './ContentTitle'
import PetsContentCard from './PetsContent/PetsContentCard'

function Pets({ handleCommentsClick }) {
    const { renterId } = useParams()
    const { pets, loading } = useGetPetsByRenterID(renterId)

    if (loading) {
        return <></>
    } else if (!pets || pets.length === 0) {
        return (
            <Paper sx={{ padding: 2, marginTop: '30px' }} elevation={10} id='PetsPaper'>
                <ContentTitle content={'Pets'} handleCommentsClick={handleCommentsClick} />
                <Alert severity='error' sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                    No pets found
                </Alert>
            </Paper>
        )
    } else {
        return (
            <Paper sx={{ padding: 2, marginTop: '30px' }} elevation={10} id='PetsPaper'>
                <ContentTitle content={'Pets'} handleCommentsClick={handleCommentsClick} />
                {pets.map((pet, index) =>
                    <PetsContentCard key={`pet-${index}`} pet={pet} />
                )}
            </Paper>
        )
    }
}

export default Pets
