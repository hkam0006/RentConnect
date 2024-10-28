import { supabase } from "../../supabase";

const useDeletePropertyManagerCompany = () => {
  const deletePropertyManagerCompany = async (property_manager_id, company_id) => {
    const {data ,error} = await supabase
      .from('PROPERTY MANAGER COMPANY')
      .delete()
      .eq('property_manager_id', property_manager_id)
      .eq('company_id', company_id);
    return {data, error}
  
  }
  return {deletePropertyManagerCompany};
}
export default useDeletePropertyManagerCompany
