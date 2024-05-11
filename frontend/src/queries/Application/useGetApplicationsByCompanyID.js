import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetApplicationsByCompanyID = (company_id) =>{
    const [applications, setApplications] = useState([]);
  
    useEffect(() => {
      const fetchApplications = async () => {
        const { data, error } = await supabase
        .from("APPLICATION")
        .select("*")
        .eq("company_id", company_id);
  
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

export default useGetApplicationsByCompanyID;