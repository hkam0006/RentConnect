import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetRenterEmploymentsByRenterID = (renter_id) =>{
    const [renter_employments, setRenterEmployments] = useState([]);
  
    useEffect(() => {
      const fetchRenterEmployments = async () => {
        const { data, error } = await supabase
        .from("RENTER EMPLOYMENT")
        .select("*")
        .eq("renter_id", renter_id);
  
        if (error) {
          console.error("Error fetching renter employments:", error.message);
        } else {
            setRenterEmployments(data);
        }
      };
  
      fetchRenterEmployments();
    }, []);
      return renter_employments;
    };

export default useGetRenterEmploymentsByRenterID;