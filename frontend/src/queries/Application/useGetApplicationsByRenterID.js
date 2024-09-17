import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';

/**
 * Get all applications by the renter ID provided.
 * @param renter_id the unique ID of the renter
 * @returns {{loading: boolean, applications: [Application]}} the applications and the loading state
 * @author Luke Phillips
 */
const useGetApplicationsByRenterID = (renter_id) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (renter_id) {
        setLoading(true);
        const { data, error } = await supabase
            .from("APPLICATION")
            .select("*")
            .eq("renter_id", renter_id);

        if (error) {
          console.error('Error finding applications:', error);
          setApplications([]); // Handle the error case by setting applications to an empty array
        } else {
          setApplications(data || []); // Ensure data is always an array
        }
        setLoading(false);
      } else {
        setLoading(false); // Ensure loading is false if renter_id is not provided
        setApplications([]); // Clear applications if no renter_id is provided
      }
    };
    fetchApplications();
  }, [renter_id]);
  return { applications, loading };
}
export default useGetApplicationsByRenterID;