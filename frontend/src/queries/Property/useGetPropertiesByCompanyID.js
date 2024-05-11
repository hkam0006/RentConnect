import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetPropertiesByCompanyID = (company_id) =>{
    const [property, setProperties] = useState([]);
  
    useEffect(() => {
      const fetchProperties = async () => {
        const { data, error } = await supabase
        .from("PROPERTY")
        .select("*")
        .eq("company_id", company_id);
  
        if (error) {
          console.error("Error fetching properties:", error.message);
        } else {
          setProperties(data);
        }
      };
  
      fetchProperties();
    }, []);
      return property;
    };

export default useGetPropertiesByCompanyID;