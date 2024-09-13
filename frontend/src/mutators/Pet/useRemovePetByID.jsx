import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useRemovePet = () => {
    const removePet = useCallback(async (pet_id, renter_id) => {
        if (pet_id && renter_id) {
            const { data, error } = await supabase
                .from('PET')
                .delete()
                .eq('pet_id', pet_id)
                .eq('renter_id', renter_id)
            if (error) {
                throw error
            }
            return data
        }
    }, [])

    return removePet
}

export default useRemovePet