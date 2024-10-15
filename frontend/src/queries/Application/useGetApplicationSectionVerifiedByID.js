import { supabase } from "../../supabase"
import { useState, useEffect } from 'react'


const useGetApplicationSectionVerifiedByID = (company_id, property_id, renter_id, section) =>{
    const [verified, setVerified] = useState(false)
  
    useEffect(() => {
      const fetchApplications = async () => {
        const { data, error } = await supabase
        .from("APPLICATION")
        .select(section)
        .eq("company_id", company_id)
        .eq("property_id", property_id)
        .eq("renter_id", renter_id)
  
        if (error) {
          console.error("Error fetching applications:", error.message)
        } else {
            if (data[0]) {
                setVerified(data[0][section])
            }
        }
      }
  
      fetchApplications()
    }, [company_id, property_id, renter_id, section])
    return { verified, setVerified }
}

export default useGetApplicationSectionVerifiedByID