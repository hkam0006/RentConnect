import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetApplicationsByPropertyID = (property_id) =>{
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const fetchApplications = async () => {
        if (property_id) {
          setLoading(true);
          const { data, error } = await supabase
            .from("APPLICATION")
            .select("*")
            .eq("property_id", property_id);
          
        if (error) {
          console.error("Error fetching applications:", error.message);
          setApplications([])
        } else {
            setApplications(data || []);
        }

        setLoading(false)
      } else {
        setLoading(false)
        setApplications([])
      }
    };
    fetchApplications();
  }, [property_id]);

  return { applications, loading }
};

export default useGetApplicationsByPropertyID;