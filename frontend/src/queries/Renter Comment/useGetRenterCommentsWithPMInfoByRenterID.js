import { supabase } from "../../supabase";

const useGetRenterCommentsWithPMInfoByRenterID = () =>{
  const fetchComments = async (renter_id) => {
    const { data, error } = await supabase
      .from("RENTER COMMENT")
      .select(
        '*, "PROPERTY MANAGER"(*)'
      )
      .eq("renter_id", renter_id);

    return {data, error}
  };
  return fetchComments
};

export default useGetRenterCommentsWithPMInfoByRenterID;