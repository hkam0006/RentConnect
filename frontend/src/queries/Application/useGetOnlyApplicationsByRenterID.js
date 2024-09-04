import { supabase } from "../../supabase"
import { useState, useEffect } from 'react'

const useGetOnlyApplicationsByRenterID = (renter_id) => {
    const [applications, setApplications] = useState([])

    useEffect(() => {
        const fetchApplications = async () => {
            if (renter_id) {
                const {data, error} = await supabase
                .from("APPLICATION")
                .select("*")
                .eq("renter_id", renter_id)
                if (error) {
                    console.error('Error finding applications:', error)
                } else {
                    setApplications(data)
                }
            }
        }
        fetchApplications()
    }, [renter_id])

    return applications
}

export default useGetOnlyApplicationsByRenterID