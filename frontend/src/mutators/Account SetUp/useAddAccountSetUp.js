import { supabase } from "../../supabase";

const useAddAccountSetUp = () => {
  const addAccountSetUp = async (account_id, account_type) => {
    const {data ,error} = await supabase
      .from('ACCOUNT SETUP')
      .insert([
        {
            account_id:account_id,
            account_type:account_type
        },
      ]);
    return {data, error}
  
  }
  return {addAccountSetUp};
}

export default useAddAccountSetUp
