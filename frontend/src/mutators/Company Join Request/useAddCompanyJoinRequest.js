import { supabase } from "../../supabase";

const useAddCompanyJoinRequest = () => {
  const addCompanyJoinRequest = async (property_manager_id, company_id) => {
    const {data ,error} = await supabase
      .from('COMPANY-JOIN-REQUEST')
      .insert([
        {
            property_manager_id:property_manager_id,
            company_id:company_id
        },
      ]);
    return {data, error}
  
  }
  return {addCompanyJoinRequest};
}
export default useAddCompanyJoinRequest
