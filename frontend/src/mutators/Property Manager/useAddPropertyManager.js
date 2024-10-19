import { supabase } from "../../supabase";

const useAddPropertyManager = () => {
  const addPropertyManager = async (user_id, property_manager_first_name, property_manager_last_name, property_manager_phone_number,property_manager_email) => {
    const {data ,error} = await supabase
      .from('PROPERTY MANAGER')
      .insert([
        {
            property_manager_id:user_id,
            property_manager_first_name:property_manager_first_name,
            property_manager_last_name:property_manager_last_name,
            property_manager_phone_number:property_manager_phone_number,
            property_manager_email:property_manager_email
        },
      ]);
    return {data, error}
  
  }
  return {addPropertyManager};
}
export default useAddPropertyManager
