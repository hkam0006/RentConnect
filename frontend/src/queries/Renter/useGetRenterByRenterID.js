import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


/**
 * Returns the renter in the DB matching the provided renter ID.
 *
 * @param renter_id id of the renter to be fetched
 * @return returns renter object
 */
const useGetRenterByRenterID = (renter_id) => {
  const [renter, setRenter] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRenter = async () => {
      if (renter_id) {
        setLoading(true);
        const { data, error } = await supabase
          .from("RENTER")
          .select("*")
          .eq("renter_id", renter_id);
        
        if (error) {
          console.log('Error finding renter:', error);
          setRenter([]);
        } else {
          setRenter(data || []);
        }

        setLoading(false);
      } else {
        setLoading(false);
        setRenter([]);
      }
    };
    fetchRenter();
  }, [renter_id]);

  return {renter, loading}
};

export default useGetRenterByRenterID;