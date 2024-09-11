import { Paper } from '@mui/material'
import useGetPetsByRenterID from '../../../../queries/Pet/useGetPetsByRenterID'
import PetsCard from './PetsCard'
import ContentTitle from './../essentials/ContentTitle'

function Pets({ userID }) {
    const pets = useGetPetsByRenterID(userID)
    function addPet() {
        console.log('lets add a pet')
    }

    return (
        <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ContentTitle title={'Pets'} addOnClick={addPet} />
            {pets && (
                pets.map((pet, index) => (
                    <PetsCard key={index} pet={pet} />
                ))
            )}
        </Paper>
    )
}

export default Pets
