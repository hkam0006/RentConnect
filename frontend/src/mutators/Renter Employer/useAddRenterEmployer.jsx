import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useAddRenterEmployer = () => {
    const addRenterEmployer = useCallback(async (
      renter_id, 
      renter_employment_id,
      renter_employer_name,
      renter_employer_phone_number,
      renter_employer_email,
    ) => {
        if (renter_id && renter_employment_id && renter_employer_name && renter_employer_phone_number && renter_employer_email) {
            const { data, error } = await supabase
                .from('RENTER-EMPLOYER')
                .insert([{
                    renter_id,
                    renter_employment_id,
                    renter_employer_name,
                    renter_employer_phone_number,
                    renter_employer_email,
                }])
                .select('*')
            if (error) {
                throw error
            }
            return data
        }
    }, [])

    return addRenterEmployer
}

export default useAddRenterEmployer