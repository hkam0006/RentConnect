import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useAddPet = () => {
    const addPet = useCallback(async (renter_id, pet_species, pet_age, pet_is_desexed, pet_microchip_number, pet_registration_number, pet_name, pet_indoor_status) => {
        if (renter_id && pet_name) {
            const { data, error } = await supabase
                .from('PET')
                .insert([{
                    renter_id,
                    pet_species, 
                    pet_age, 
                    pet_is_desexed, 
                    pet_microchip_number, 
                    pet_registration_number, 
                    pet_name, 
                    pet_indoor_status
                }])
                .select('*')
            if (error) {
                throw error
            }
            return data
        }
    }, [])

    return addPet
}

export default useAddPet