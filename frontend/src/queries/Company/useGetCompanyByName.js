import { supabase } from "../../supabase";

const useGetCompanyByName = () =>{
  const fetchCompany = async (company_name) => {
    const { data, error } = await supabase
      .from("COMPANY")
      .select("*")
      .eq("company_name", company_name);

    return {data, error}
  };
  return {fetchCompany}
};

export default useGetCompanyByName;