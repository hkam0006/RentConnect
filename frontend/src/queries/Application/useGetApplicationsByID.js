import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetApplicationsByID = (company_id, property_id, renter_id) =>{
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

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
        if (data[0]) {
          setApplication(data[0]);
        }
      }
      setLoading(false);
    };

    fetchApplications();
  }, [company_id, property_id, renter_id, setLoading]);
  return { application, loading };
};

export default useGetApplicationsByID;