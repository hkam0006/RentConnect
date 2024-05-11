import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const getInspectionsByPropertyID = (property_id) =>{
    const [inspections, setInspections] = useState([]);
  
    useEffect(() => {
      const fetchInspections = async () => {
        const { data, error } = await supabase
        .from("INSPECTION")
        .select("*")
        .eq("property_id", property_id);
  
        if (error) {
          console.error("Error fetching inspections:", error.message);
        } else {
            setInspections(data);
        }
      };
  
      fetchInspections();
    }, []);
      return inspections;
    };

export default getInspectionsByPropertyID;