import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetPropertyByPropertyID = (property_id) =>{
    const [property, setProperties] = useState([]);
  
    useEffect(() => {
      const fetchProperties = async () => {
        const { data, error } = await supabase
        .from("PROPERTY")
        .select("*")
        .eq("property_id", property_id);
  
        if (error) {
          console.error("Error fetching property:", error.message);
        } else {
          setProperties(data);
        }
      };
  
      fetchProperties();
    }, []);
      return property;
    };

export default useGetPropertyByPropertyID;