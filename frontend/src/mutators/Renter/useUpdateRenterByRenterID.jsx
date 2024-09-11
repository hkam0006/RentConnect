import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useUpdateRenterByRenterID = () => {
    const updateRenter = useCallback(async (renter_id, renter_first_name, renter_last_name, renter_email, renter_phone_number) => {
        if (renter_id && renter_first_name && renter_last_name && renter_email && renter_phone_number) {
            const { data, error } = await supabase
                .from("RENTER")
                .update({ 
                    renter_first_name, 
                    renter_last_name, 
                    renter_email, 
                    renter_phone_number 
                })
                .eq('renter_id', renter_id)
                .select('*')
            if (error) {
                throw error
            }
            return data
        }
    }, [])

    return updateRenter
}

export default useUpdateRenterByRenterID
