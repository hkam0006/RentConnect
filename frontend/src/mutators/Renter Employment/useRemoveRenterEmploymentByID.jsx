import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useRemoveRenterEmployment = () => {
    const removeRenterEmployment = useCallback(async (renter_employment_id, renter_id) => {
        if (renter_employment_id && renter_id) {
            const { data, error } = await supabase
                .from('RENTER EMPLOYMENT')
                .delete()
                .eq('renter_employment_id', renter_employment_id)
                .eq('renter_id', renter_id)
            if (error) {
                throw error
            }
            return data
        }
    }, [])

    return removeRenterEmployment
}

export default useRemoveRenterEmployment