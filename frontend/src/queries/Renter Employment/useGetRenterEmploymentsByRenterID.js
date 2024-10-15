import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetRenterEmploymentsByRenterID = (renter_id) =>{
    const [renterEmployments, setRenterEmployments] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchRenterEmployments = async () => {
        const { data, error } = await supabase
        .from("RENTER-EMPLOYMENT")
        .select("*")
        .eq("renter_id", renter_id)
        .order("renter_employment_end", { ascending: true, nullsFirst: true })
        .order("renter_employment_end", { ascending: false })
        .order("renter_employment_start", { ascending: false });

        if (error) {
          console.error("Error fetching renter employments:", error.message);
        } else {
            setRenterEmployments(data);
        }
        setLoading(false);
      };
  
      fetchRenterEmployments();
    }, [renter_id]);
      return { renterEmployments, setRenterEmployments, loading };
    };

export default useGetRenterEmploymentsByRenterID;