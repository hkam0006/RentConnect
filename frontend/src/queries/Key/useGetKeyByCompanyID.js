import { supabase } from "../../supabase";

const useGetKeyByCompanyID = (company_id) =>{
  const fetchKeys = async () => {
    const { data, error } = await supabase
      .from("KEY")
      .select("*")
      .eq("company_id", company_id);

    return {data, error}
  };
  return {fetchKeys}
};

export default useGetKeyByCompanyID;