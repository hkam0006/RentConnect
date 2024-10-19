import { supabase } from "../../supabase";


const useGetPropertiesByCompanyID = () =>{

  const fetchProperties = async (company_id) => {
    const {data, error} = await supabase
      .from("PROPERTY")
      .select("*")
      .eq("company_id", company_id)

    return {data, error}
  }

  return {fetchProperties};
};

export default useGetPropertiesByCompanyID;