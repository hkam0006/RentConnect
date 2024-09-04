import { supabase } from "../../supabase";

const useGetPropertyManagerByPropertyManagerID = () =>{
  const fetchPropertyManager = async (account_id) => {
    const { data, error } = await supabase
      .from("PROPERTY MANAGER")
      .select("*")
      .eq("property_manager_id", account_id);

    return {data, error}
  };
  return fetchPropertyManager
};

export default useGetPropertyManagerByPropertyManagerID;