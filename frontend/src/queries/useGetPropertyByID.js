import { supabase } from "../supabase";
import { useState, useEffect } from 'react';


const useGetPropertyByID = (property_id) =>{
    const [property, setProperties] = useState([]);
  
    useEffect(() => {
      const fetchProperties = async () => {
        const { data, error } = await supabase.from("PROPERTY").select("*").eq("property_id", property_id);
  
        if (error) {
          console.error("Error fetching properties:", error.message);
        } else {
          console.log("Fetched properties:", data);
          setProperties(data);
        }
      };
  
      fetchProperties();
    }, []);
      return property;
    };

export default useGetPropertyByID;