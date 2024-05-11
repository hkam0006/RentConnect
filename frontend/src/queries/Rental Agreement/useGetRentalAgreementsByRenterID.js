import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetRentalAgreementsByRenterID = (renter_id) =>{
    const [application_comments, setRentalAgreement] = useState([]);
  
    useEffect(() => {
      const fetchRentalAgreement = async () => {
        const { data, error } = await supabase
        .from("RENTAL AGREEMENT")
        .select("*")
        .eq("renter_id", renter_id);
  
        if (error) {
          console.error("Error fetching rental agreements:", error.message);
        } else {
            setRentalAgreement(data);
        }
      };
  
      fetchRentalAgreement();
    }, []);
      return application_comments;
    };

export default useGetRentalAgreementsByRenterID;