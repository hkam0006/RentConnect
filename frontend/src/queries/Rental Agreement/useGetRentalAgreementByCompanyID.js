import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

const useGetRentalAgreementByCompanyID = (company_id) => {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    const fetchTotalLeased = async () => {
      if (company_id){
        const {data, error} = await supabase
          .from("RENTAL AGREEMENT")
          .select("*")
          .eq("company_id", company_id)
        
        if (error){
          console.error(error);
        } else {
          setAgreements(data)
        }
      }
    }

    fetchTotalLeased();
  }, [company_id])

  return agreements;
}

export default useGetRentalAgreementByCompanyID