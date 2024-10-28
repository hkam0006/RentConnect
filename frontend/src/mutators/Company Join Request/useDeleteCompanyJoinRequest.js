import { supabase } from "../../supabase";

const useDeleteCompanyJoinRequest = () => {
  const deleteCompanyJoinRequest = async (property_manager_id, company_id) => {
    const {data ,error} = await supabase
      .from('COMPANY JOIN REQUEST')
      .delete()
      .eq('property_manager_id', property_manager_id)
      .eq('company_id', company_id);
    return {data, error}
  
  }
  return {deleteCompanyJoinRequest};
}
export default useDeleteCompanyJoinRequest
