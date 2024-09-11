import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useAddPreviousTenancy = () => {
    const addPreviousTenancy = useCallback(async (renter_id, previous_tenancy_address, previous_tenancy_contact_name, previous_tenancy_contact_email, previous_tenancy_contact_phone) => {
        if (renter_id && previous_tenancy_address && previous_tenancy_contact_name && previous_tenancy_contact_email && previous_tenancy_contact_phone) {
            const { data, error } = await supabase
                .from('PREVIOUSTENANCY')
                .insert([{
                    renter_id,
                    previous_tenancy_address,
                    previous_tenancy_contact_name,
                    previous_tenancy_contact_phone,
                    previous_tenancy_contact_email
                }])
                .select('*')
            if (error) {
                throw error
            }
            return data
        }
    }, [])

    return addPreviousTenancy
}

export default useAddPreviousTenancy