import { supabase } from "../../supabase";

const useGetRenterByRenterID = () =>{
  const fetchRenter = async (account_id) => {
    const { data, error } = await supabase
      .from("RENTER")
      .select("*")
      .eq("renter_id", account_id);

    return {data, error}
  };
  return fetchRenter
};

export default useGetRenterByRenterID;