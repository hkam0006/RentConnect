import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetRentalAgreementsByPropertyID = (property_id) =>{
    const [application_comments, setRentalAgreement] = useState([]);
  
    useEffect(() => {
      const fetchRentalAgreement = async () => {
        const { data, error } = await supabase
        .from("RENTAL AGREEMENT")
        .select("*")
        .eq("property_id", property_id);
  
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

export default useGetRentalAgreementsByPropertyID;