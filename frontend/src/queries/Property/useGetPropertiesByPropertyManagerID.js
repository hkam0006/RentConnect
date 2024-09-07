import { supabase } from "../../supabase";

const useGetPropertyByPropertyManagerID = () =>{
  const fetchProperty = async (property_manager_id) => {
    const { data, error } = await supabase
      .from("PROPERTY")
      .select("*")
      .eq("property_manager_id", property_manager_id);

    return {data, error}
  };
  return fetchProperty
};

export default useGetPropertyByPropertyManagerID;