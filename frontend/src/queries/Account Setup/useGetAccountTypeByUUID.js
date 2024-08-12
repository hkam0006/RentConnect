import { supabase } from "../../supabase";

const useGetAccountTypeByUUID = () =>{
  const fetchAccountType = async (account_id) => {
    const { data, error } = await supabase
      .from("ACCOUNT SETUP")
      .select("account_type")
      .eq("account_id", account_id);

    return {data, error}
  };
  return fetchAccountType
};

export default useGetAccountTypeByUUID;