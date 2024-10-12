import { supabase } from "../../supabase"

const useGetPropertyByPropertyIDRepeatable = () =>{

    const fetchProperty = async (property_id) => {
      const {data, error} = await supabase
        .from("PROPERTY")
        .select("*")
        .eq("property_id", property_id)
  
      return {data, error}
    }
  
    return {fetchProperty};
  };
  
  export default useGetPropertyByPropertyIDRepeatable;