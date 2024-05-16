import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetApplicationsByID = (company_id, property_id, renter_id) =>{
    const [applications, setApplications] = useState([]);
  
    useEffect(() => {
      const fetchApplications = async () => {
        const { data, error } = await supabase
        .from("APPLICATION")
        .select("*")
        .eq("company_id", company_id)
        .eq("property_id", property_id)
        .eq("renter_id", renter_id);
  
        if (error) {
          console.error("Error fetching applications:", error.message);
        } else {
            setApplications(data);
        }
      };
  
      fetchApplications();
    }, [company_id, property_id, renter_id]);
      return applications;
    };

export default useGetApplicationsByID;