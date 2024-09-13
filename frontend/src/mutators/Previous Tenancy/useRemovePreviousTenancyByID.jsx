import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useRemovePreviousTenancy = () => {
    const removePreviousTenancy = useCallback(async (previous_tenancy_id, renter_id) => {
        if (previous_tenancy_id && renter_id) {
            const { data, error } = await supabase
                .from('PREVIOUS-TENANCY')
                .delete()
                .eq('previous_tenancy_id', previous_tenancy_id)
                .eq('renter_id', renter_id)
            if (error) {
                throw error
            }
            return data
        }
    }, [])

    return removePreviousTenancy
}

export default useRemovePreviousTenancy