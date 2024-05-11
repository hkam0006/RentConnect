import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const getInspectionRunsByDateRange = (start_date, end_date) =>{
    const [inspection_runs, setInspectionRuns] = useState([]);
  
    useEffect(() => {
      const fetchInspectionRuns = async () => {
        const { data, error } = await supabase
        .from("INSPECTION RUN")
        .select("*")
        .gte("start_date", start_date)
        .lte("end_date", end_date);
  
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

export default getInspectionRunsByDateRange;