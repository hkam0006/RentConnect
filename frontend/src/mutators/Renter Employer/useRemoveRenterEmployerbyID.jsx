import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useRemoveRenterEmployer = () => {
    const removeRenterEmployer = useCallback(async (renter_employment_id, renter_id) => {
        if (renter_employment_id && renter_id) {
            const { data, error } = await supabase
                .from('RENTER-EMPLOYER')
                .delete()
                .eq('renter_employment_id', renter_employment_id)
                .eq('renter_id', renter_id)
            if (error) {
                throw error
            }
            return data
        }
    }, [])

    return removeRenterEmployer
}

export default useRemoveRenterEmployer