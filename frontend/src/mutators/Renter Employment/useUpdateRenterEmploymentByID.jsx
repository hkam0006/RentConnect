import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useUpdateRenterEmployment = () => {
    const updateRenterEmployment = useCallback(async (renter_employment_id, renter_id, renter_employment_title, renter_employment_type, renter_employment_gross_income, renter_employment_net_income, 
        renter_employment_start, renter_employment_end, employer_name, employer_phone, employer_email, renter_employment_location) => {
    if (renter_employment_id && renter_id && renter_employment_title && renter_employment_type && renter_employment_gross_income && renter_employment_net_income && 
        renter_employment_start && employer_name && employer_phone && employer_email && renter_employment_location) {
            const { data, error } = await supabase
                .from('RENTER EMPLOYMENT')
                .update({
                    renter_employment_title, 
                    renter_employment_type, 
                    renter_employment_gross_income, 
                    renter_employment_net_income, 
                    renter_employment_start, 
                    renter_employment_end, 
                    employer_name, 
                    employer_phone, 
                    employer_email, 
                    renter_employment_location
                })
                .eq('renter_employment_id', renter_employment_id)
                .eq('renter_id', renter_id)
                .select('*')
            if (error) {
                throw error
            }
            return data
        }
    }, [])

    return updateRenterEmployment
}

export default useUpdateRenterEmployment