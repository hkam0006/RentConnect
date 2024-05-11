import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetPreviousTenanciesByRenterID = (renter_id) =>{
    const [previous_tenancies, setPreviousTenancies] = useState([]);
  
    useEffect(() => {
      const fetchPreviousTenancies = async () => {
        const { data, error } = await supabase
        .from("PREVIOUS TENANCY")
        .select("*")
        .eq("renter_id", renter_id);
  
        if (error) {
          console.error("Error fetching previous tenancies:", error.message);
        } else {
            setPreviousTenancies(data);
        }
      };
  
      fetchPreviousTenancies();
    }, []);
      return previous_tenancies;
    };

export default useGetPreviousTenanciesByRenterID;