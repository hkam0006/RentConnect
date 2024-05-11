import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetKeysByPropertyManagerID = (property_manager_id) =>{
    const [keys, setKeys] = useState([]);
  
    useEffect(() => {
      const fetchKeys = async () => {
        const { data, error } = await supabase
        .from("KEY")
        .select("*")
        .eq("property_manager_id", property_manager_id);
  
        if (error) {
          console.error("Error fetching keys:", error.message);
        } else {
          setKeys(data);
        }
      };
  
      fetchKeys();
    }, []);
      return keys;
    };

export default useGetKeysByPropertyManagerID;