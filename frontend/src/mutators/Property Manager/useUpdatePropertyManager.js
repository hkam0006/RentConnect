import { supabase } from "../../supabase";

const useUpdatePropertyManager = () => {
  const updatePropertyManager = async (property_manager_id, property_manager_first_name, property_manager_last_name, property_manager_phone_number,property_manager_email, property_manager_about_me) => {
    const {data ,error} = await supabase
      .from('PROPERTY MANAGER')
      .update([
        {
            property_manager_first_name:property_manager_first_name,
            property_manager_last_name:property_manager_last_name,
            property_manager_phone_number:property_manager_phone_number,
            property_manager_email:property_manager_email,
            property_manager_about_me:property_manager_about_me
        },
      ])
      .eq("property_manager_id", property_manager_id);
    return {data, error}
  
  }
  return updatePropertyManager;
}

export default useUpdatePropertyManager;