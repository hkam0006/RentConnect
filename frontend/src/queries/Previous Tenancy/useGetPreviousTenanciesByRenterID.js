import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetPreviousTenanciesByRenterID = (renter_id, callback) =>{
    const [previous_tenancies, setPreviousTenancies] = useState([]);
  
    useEffect(() => {
      const fetchPreviousTenancies = async () => {
        const { data, error } = await supabase
        .from("PREVIOUSTENANCY")
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
      };
  
      fetchPreviousTenancies();
    }, [renter_id]);
      return previous_tenancies;
    };

export default useGetPreviousTenanciesByRenterID;