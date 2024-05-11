import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetApplicationsByPropertyID = (property_id) =>{
    const [applications, setApplications] = useState([]);
  
    useEffect(() => {
      const fetchApplications = async () => {
        const { data, error } = await supabase
        .from("APPLICATION")
        .select("*")
        .eq("property_id", property_id);
  
        if (error) {
          console.error("Error fetching applications:", error.message);
        } else {
            setApplications(data);
        }
      };
  
      fetchApplications();
    }, []);
      return applications;
    };

export default useGetApplicationsByPropertyID;