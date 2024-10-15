import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetPreviousTenanciesByRenterID = (renter_id, callback) =>{
    const [previousTenancies, setPreviousTenancies] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPreviousTenancies = async () => {
        const { data, error } = await supabase
        .from("PREVIOUS-TENANCY")
        .select("*")
        .eq("renter_id", renter_id);
  
        if (error) {
          console.error("Error fetching previous tenancies:", error.message);
        } else {
            setPreviousTenancies(data);
        }
        if (Boolean(callback)){
          callback()
        }
        setLoading(false);
      };
  
      fetchPreviousTenancies();
    }, [renter_id]);
      return { previousTenancies, setPreviousTenancies, loading };
    };

export default useGetPreviousTenanciesByRenterID;