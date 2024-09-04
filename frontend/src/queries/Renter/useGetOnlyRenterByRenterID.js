import { supabase } from "../../supabase"
import { useState, useEffect } from 'react'

const useGetOnlyRenterByRenterID = (renter_id) => {
    const [renter, setRenter] = useState([])

    useEffect(() => {
        const fetchRenter = async () => {
            if (renter_id) {
                const { data, error } = await supabase
                    .from("RENTER")
                    .select("*")
                    .eq("renter_id", renter_id)
                    .limit(1)

                if (error) {
                    console.error("Error fetching renter:", error.message)
                }
                setRenter(data)
            }
        }

        fetchRenter()
    }, [renter_id])

    return renter
}

export default useGetOnlyRenterByRenterID