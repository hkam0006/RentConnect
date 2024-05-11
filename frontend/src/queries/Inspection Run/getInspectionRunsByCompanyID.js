import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const getInspectionRunsByCompanyID = (company_id) =>{
    const [inspection_runs, setInspectionRuns] = useState([]);
  
    useEffect(() => {
      const fetchInspectionRuns = async () => {
        const { data, error } = await supabase
        .from("INSPECTION RUN")
        .select("*")
        .eq("company_id", company_id);
  
        if (error) {
          console.error("Error fetching inspection runs:", error.message);
        } else {
          setInspectionRuns(data);
        }
      };
  
      fetchInspectionRuns();
    }, []);
      return inspection_runs;
    };

export default getInspectionRunsByCompanyID;