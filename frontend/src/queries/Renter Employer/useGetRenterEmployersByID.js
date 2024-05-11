import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetRenterEmployersByID = (renter_id) =>{
    const [renter_employers, setRenterEmployers] = useState([]);
  
    useEffect(() => {
      const fetchRenterEmployers = async () => {
        const { data, error } = await supabase
        .from("RENTER EMPLOYMENT")
        .select("*")
        .eq("renter_id", renter_id);
  
        if (error) {
          console.error("Error fetching renter employments:", error.message);
        } else {
          setRenterEmployers(data);
        }
      };
  
      fetchRenterEmployers();
    }, []);
      return renter_employers;
    };

export default useGetRenterEmployersByID;