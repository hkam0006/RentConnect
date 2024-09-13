import { supabase } from "../../supabase";
import { useCallback } from "react";

const useUpdateRenterEmployer = () => {
  const updateRenterEmployer = useCallback(async (renter_id, employer_id, newDetails) => {
    const { data, error } = await supabase
      .from("RENTER-EMPLOYER")
      .update([{ 
        renter_employer_name: newDetails.name,
        renter_employer_phone_number: newDetails.phone,
        renter_employer_email: newDetails.email,
      }])
      .eq('renter_employer_id', employer_id)
      .eq('renter_id', renter_id)
    if (error) throw error;
    return data;
  }, [])

  return updateRenterEmployer;
}

export default useUpdateRenterEmployer