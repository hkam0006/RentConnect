import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useUpdatePet = () => {
    const updatePet = useCallback(async (pet_id, renter_id, pet_species, pet_age, pet_is_desexed, pet_microchip_number, pet_registration_number, pet_name, pet_indoor_status) => {
        if (renter_id && pet_name) {
            const { data, error } = await supabase
                .from('PET')
                .update({
                    pet_species, 
                    pet_age, 
                    pet_is_desexed, 
                    pet_microchip_number, 
                    pet_registration_number, 
                    pet_name, 
                    pet_indoor_status
                })
                .eq('pet_id', pet_id)
                .eq('renter_id', renter_id)
                .select('*')
            if (error) {
                throw error
            }
            return data
        }
    }, [])

    return updatePet
}

export default useUpdatePet