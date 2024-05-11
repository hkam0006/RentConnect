import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetPropertyManagerByPropertyManagerID = (property_manager_id) =>{
    const [property_manager, setPropertyManager] = useState([]);
  
    useEffect(() => {
      const fetchPropertyManager = async () => {
        const { data, error } = await supabase
        .from("PROPERTY MANAGER")
        .select("*")
        .eq("property_manager_id", property_manager_id);
  
        if (error) {
          console.error("Error fetching property manager:", error.message);
        } else {
          setPropertyManager(data);
        }
      };
  
      fetchPropertyManager();
    }, []);
      return property_manager;
    };

export default useGetPropertyManagerByPropertyManagerID;