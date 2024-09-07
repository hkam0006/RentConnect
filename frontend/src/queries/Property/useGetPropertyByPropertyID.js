import { supabase } from "../../supabase";

const useGetPropertyByPropertyID = () =>{
  const fetchProperties = async (property_id) => {
    const { data, error } = await supabase
      .from("PROPERTY")
      .select("*")
      .eq("property_id", property_id);

    return {data, error}
  };
  return fetchProperties
};

export default useGetPropertyByPropertyID;