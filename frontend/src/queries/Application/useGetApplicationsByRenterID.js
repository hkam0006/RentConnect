import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetApplicationsByRenterID = (renter_id) =>{
    const [applications, setApplications] = useState([]);
  
    useEffect(() => {
      const fetchApplications = async () => {
        const { data, error } = await supabase
        .from("APPLICATION")
        .select("*")
        .eq("renter_id", renter_id);
  
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

export default useGetApplicationsByRenterID;