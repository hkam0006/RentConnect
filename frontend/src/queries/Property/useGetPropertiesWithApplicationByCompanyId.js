import { supabase } from "../../supabase";


const uesGetPropertiesWithApplicationByCompanyId = (company_id) =>{

  const fetchProperties = async () => {
    const {data, error} = await supabase
      .from("PROPERTY")
      .select(`
        *,
        APPLICATION (property_id, company_id)
      `)
      .eq("company_id", company_id)
    return {data, error}
  }

  return {fetchProperties};
};

export default uesGetPropertiesWithApplicationByCompanyId;