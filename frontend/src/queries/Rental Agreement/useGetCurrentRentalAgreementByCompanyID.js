import {supabase} from "../../supabase"
import {useState, useEffect} from "react";

const useGetPropertiesLeasedByCompanyID = (company_id) => {
  const [count, setCount] = useState();

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchLeased = async () => {
      if (company_id){
        const {data, error} = await supabase
          .from("RENTAL AGREEMENT")
          .select("*")
          .eq("company_id", company_id)
          .lte("rental_agreement_end", today)
          .gte("rental_agreement_start", today)
        if (error){
          console.error(error)
        } else {
          setCount(data.length);
        }
      }
    }

    fetchLeased();
  }, [company_id])

  return count;
}

export default useGetPropertiesLeasedByCompanyID;
