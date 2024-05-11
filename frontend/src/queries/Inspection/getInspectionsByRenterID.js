import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const getInspectionsByRenterID = (renter_id) =>{
    const [inspections, setInspections] = useState([]);
  
    useEffect(() => {
      const fetchInspections = async () => {
        const { data, error } = await supabase
        .from("INSPECTION")
        .select("*")
        .eq("renter_id", renter_id);
  
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

export default getInspectionsByRenterID;