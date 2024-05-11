import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetPropetyManagersByCompanyID = (company_id) =>{
    const [property_managers, setPropertyManagers] = useState([]);
  
    useEffect(() => {
      const fetchPropertyManagers = async () => {
        const { data, error } = await supabase
        .from("PROPERTY MANAGER")
        .select("*")
        .eq("company_id", company_id);
  
        if (error) {
          console.error("Error fetching property managers:", error.message);
        } else {
          setPropertyManagers(data);
        }
      };
  
      fetchPropertyManagers();
    }, []);
      return property_managers;
    };

export default useGetPropetyManagersByCompanyID;