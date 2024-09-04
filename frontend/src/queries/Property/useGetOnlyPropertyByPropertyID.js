import { supabase } from "../../supabase"
import { useState, useEffect } from 'react'

const useGetOnlyPropertyByPropertyID = (property_id) =>{
    const [property, setProperty] = useState([])
    
    useEffect(() => {
        const fetchProperty = async () => {
            if (property_id) {
                const {data, error } = await supabase
                .from("PROPERTY")
                .select("*")
                .eq("property_id", property_id)
                .limit(1)
                
                if (error) {
                    console.error('Error finding properties:', error)
                } else {
                    setProperty(data)
                }
            }
        }
        fetchProperty()
    }, [property_id])
    
    return property
}

export default useGetOnlyPropertyByPropertyID