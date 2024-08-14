import { supabase } from "../../supabase";

const useAddCompany = () => {
  const addCompany = async (super_admin_id, company_name) => {
    const {data ,error} = await supabase
      .from('COMPANY')
      .insert([
        {
            super_admin_id:super_admin_id,
            company_name:company_name
        },
      ]);
    return {data, error}
  
  }
  return {addCompany};
}
export default useAddCompany