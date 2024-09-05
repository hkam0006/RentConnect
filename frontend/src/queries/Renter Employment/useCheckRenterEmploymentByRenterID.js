import { supabase } from "../../supabase"
import { useState, useEffect } from 'react';

const useCheckRenterEmploymentByRenterID = (renter_id) => {
    const [exists, setExists] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (renter_id) {
                const { data, error } = await supabase
                .from('RENTER EMPLOYMENT')
                .select('renter_employment_id')
                .eq('renter_id', renter_id)
                .limit(1)
        
                if (error) {
                    console.error('Error checking if supporting document exists:', error)
                } else {
                    setExists(data.length > 0)
                }
            }
        }
        fetchData()
    }, [renter_id])
    return exists
}

export default useCheckRenterEmploymentByRenterID