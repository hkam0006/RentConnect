import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const getInspectionsByID = (company_id, Inspection_run_id) =>{
    const [inspections, setInspections] = useState([]);
  
    useEffect(() => {
      const fetchInspections = async () => {
        const { data, error } = await supabase
        .from("INSPECTION")
        .select("*")
        .eq("company_id", company_id)
        .eq("Inspection_run_id", Inspection_run_id);
  
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

export default getInspectionsByID;