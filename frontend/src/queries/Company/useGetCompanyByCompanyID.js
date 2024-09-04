import { supabase } from "../../supabase";

const useGetCompanyByCompanyID = () =>{
  const fetchCompany = async (company_id) => {
    const { data, error } = await supabase
      .from("COMPANY")
      .select("*")
      .eq("company_id", company_id);

    return {data, error}
  };
  return fetchCompany
};

export default useGetCompanyByCompanyID;