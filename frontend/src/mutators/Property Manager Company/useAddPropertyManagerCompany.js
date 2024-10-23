import { supabase } from "../../supabase";

const useAddPropertyManagerCompany = () => {
  const addPropertyManagerCompany = async (property_manager_id, company_id) => {
    const {data ,error} = await supabase
      .from('PROPERTY MANAGER')
      .insert([
        {
            property_manager_id:property_manager_id,
            company_id:company_id
        },
      ]);
    return {data, error}
  
  }
  return {addPropertyManagerCompany};
}
export default useAddPropertyManagerCompany