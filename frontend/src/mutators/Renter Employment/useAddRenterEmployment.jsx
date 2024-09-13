import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useAddRenterEmployment = () => {
    const addRenterEmployment = useCallback(async (renter_id, renter_employment_title, renter_employment_type, renter_employment_gross_income, renter_employment_net_income, 
            renter_employment_start, renter_employment_end, employer_name, employer_phone, employer_email, renter_employment_location) => {
        if (renter_id && renter_employment_title && renter_employment_type && renter_employment_gross_income && renter_employment_net_income && 
            renter_employment_start && employer_name && employer_phone && employer_email && renter_employment_location) {
            const { data, error } = await supabase
                .from('RENTER-EMPLOYMENT')
                .insert([{
                    renter_id, 
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
                }])
                .select('*')
            if (error) {
                throw error
            }
            return data
        }
    }, [])

    return addRenterEmployment
}

export default useAddRenterEmployment