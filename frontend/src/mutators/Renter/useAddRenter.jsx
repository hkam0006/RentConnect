import { supabase } from "../../supabase";

const useAddRenter = () => {
  const addRenter = async (user_id, renter_email, renter_first_name, renter_last_name, renter_phone_number) => {
    const {data ,error} = await supabase
      .from('RENTER')
      .insert([
        {
            renter_id:user_id,
            renter_first_name:renter_first_name,
            renter_last_name:renter_last_name,
            renter_phone_number:renter_phone_number,
            renter_email:renter_email
        },
      ]);
    return {data, error}
  
  }
  return {addRenter};
}
export default useAddRenter
