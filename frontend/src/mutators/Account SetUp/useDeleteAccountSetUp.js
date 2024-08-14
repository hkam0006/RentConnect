import { supabase } from "../../supabase";

const useDeleteAccountSetUp = () => {
  const deleteAccountSetUp = async (account_id) => {
    const {data ,error} = await supabase
      .from('ACCOUNT SETUP')
      .delete('*')
      .eq('account_id', account_id);
    return {data, error}
  }
  return {deleteAccountSetUp};
}

export default useDeleteAccountSetUp
