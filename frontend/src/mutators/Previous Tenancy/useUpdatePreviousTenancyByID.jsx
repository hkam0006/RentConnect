import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useUpdatePreviousTenancy = () => {
    const updatePreviousTenancy = useCallback(async (previous_tenancy_id, renter_id, previous_tenancy_address, previous_tenancy_contact_name, previous_tenancy_contact_email, previous_tenancy_contact_phone) => {
        if (previous_tenancy_id && renter_id && previous_tenancy_address && previous_tenancy_contact_name && previous_tenancy_contact_email && previous_tenancy_contact_phone) {
            const { data, error } = await supabase
                .from('PREVIOUSTENANCY')
                .update({
                    previous_tenancy_address,
                    previous_tenancy_contact_name,
                    previous_tenancy_contact_phone,
                    previous_tenancy_contact_email
                })
                .eq('previous_tenancy_id', previous_tenancy_id)
                .eq('renter_id', renter_id)
                .select('*')
            if (error) {
                throw error
            }
            return data
        }
    }, [])

    return updatePreviousTenancy
}

export default useUpdatePreviousTenancy