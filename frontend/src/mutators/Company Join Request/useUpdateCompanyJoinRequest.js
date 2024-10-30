import { supabase } from "../../supabase";

const useUpdateCompanyJoinRequest = () => {
  const updateCompanyJoinRequest = async (property_manager_id, company_id, status) => {
    const {data ,error} = await supabase
      .from('COMPANY-JOIN-REQUEST')
      .update({request_status: status})
      .eq('company_id', company_id)
      .eq('property_manager_id', property_manager_id);
    return {data, error}
  }
  return updateCompanyJoinRequest;
}
export default useUpdateCompanyJoinRequest
