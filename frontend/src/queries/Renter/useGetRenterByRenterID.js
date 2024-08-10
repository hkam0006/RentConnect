import { supabase } from "../../supabase"
import { useState, useEffect } from 'react'


const useGetRenterByRenterID = (renter_id) =>{
    const [renter, setRenter] = useState([])
  
    useEffect(() => {
      const fetchRenter = async () => {
        const { data, error } = await supabase
        .from("RENTER")
        .select("*")
        .eq("renter_id", renter_id)
  
        if (error) {
          console.error("Error fetching renter:", error.message)
        } else {
            setRenter(data)
        }
      }
  
      fetchRenter()
    }, [renter_id])
      return renter
    }

export default useGetRenterByRenterID