import { supabase } from "../../supabase";

const useUpdateApplicationStatusByID = () => {
  const updateApplicationStatusByID = async (companyId, propertyId, renterId, verificationType, verificationStatus) => {
    try {
        const { data, error } = await supabase
            .from("APPLICATION")
            .update([{ [verificationType]: verificationStatus }])
            .eq('company_id', companyId)
            .eq('property_id', propertyId)
            .eq('renter_id', renterId)
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error.message)
    }
  }
  return updateApplicationStatusByID;
}

export default useUpdateApplicationStatusByID;
