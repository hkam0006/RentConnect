import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetRenterEmployersByID = (renter_id, callback) =>{
    const [renter_employers, setRenterEmployers] = useState([]);
  
    useEffect(() => {
      const fetchRenterEmployers = async () => {
        const { data, error } = await supabase
        .from("RENTER-EMPLOYER")
        .select("*")
        .eq("renter_id", renter_id);
  
        if (error) {
          console.error("Error fetching renter employments:", error.message);
        } else {
          setRenterEmployers(data);
        }
        if (Boolean(callback)){
          callback()
        }
      };
  
      fetchRenterEmployers();
    }, []);

    return renter_employers;
    };

export default useGetRenterEmployersByID;