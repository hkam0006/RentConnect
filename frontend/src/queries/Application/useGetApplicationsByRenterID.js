import { supabase } from "../../supabase";

const useGetApplicationsByRenterID = () =>{
  const fetchApplications = async (renter_id) => {
    const { data, error } = await supabase
      .from("APPLICATION")
      .select("*")
      .eq("renter_id", renter_id);

    return {data, error}
  };
  return fetchApplications
};

export default useGetApplicationsByRenterID;