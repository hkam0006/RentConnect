import { useState, useEffect, useCallback } from 'react'
import { Paper } from '@mui/material'
import useGetPetsByRenterID from '../../../../queries/Pet/useGetPetsByRenterID'
import PetsCard from './PetsCard'
import ContentTitle from './../essentials/ContentTitle'
import useSubscribeTableByRenterID from '../../../../subscribers/useSubscribeTableByRenterID'
import PetsDialog from '../Dialogs/PetsDialog'

function Pets({ userID }) {
    const [pets, setPets] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const fetchedPets = useGetPetsByRenterID(userID)
    useEffect(() => {
        setPets(fetchedPets)
    }, [fetchedPets])

    function closeDialog() {
        setIsDialogOpen(false)
    }

    function addButton() {
        setIsDialogOpen(true)
    }

    const updatePet = useCallback((payload) => {
        let updatedPets
    
        switch (payload.eventType) {
            case 'INSERT':
                updatedPets = [...pets, payload.new]
                break
            case 'UPDATE':
                updatedPets = pets.map((pet) => 
                    pet.pet_id === payload.new.pet_id
                        ? payload.new
                        : pet
                )
                break
            case 'DELETE':
                updatedPets = pets.filter(
                    (pet) => pet.pet_id !== payload.old.pet_id
                )
                break
            default:
                updatedPets = [...pets]
                break
        }
    
        setPets(updatedPets)
    }, [pets])
    useSubscribeTableByRenterID('PET', userID, updatePet)

    return (
        <>
            <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <ContentTitle title={'Pets'} addOnClick={addButton} />
                {pets && (
                    pets.map((pet, index) => (
                        <PetsCard key={index} pet={pet} />
                    ))
                )}
            </Paper>
            {isDialogOpen && <PetsDialog pet={{renter_id: userID}} closeDialog={closeDialog} isUpdate={false}/>}
        </>
    )
}

export default Pets
