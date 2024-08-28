import { supabase } from "../../supabase";

const useAddCompany = () => {
  const addCompany = async (super_admin_id, company_name, company_abn, company_phone, company_street_address, company_suburb, company_state) => {
    const {data ,error} = await supabase
      .from('COMPANY')
      .insert([
        {
            super_admin_id:super_admin_id,
            company_name:company_name,
            company_abn:company_abn,
            company_phone:company_phone,
            company_street_address:company_street_address,
            company_suburb:company_suburb,
            company_state:company_state
        },
      ]);
    return {data, error}
  
  }
  return {addCompany};
}
export default useAddCompany