import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetCompaniesByName = (company_name) =>{
    const [companies, setCompanies] = useState([]);
  
    useEffect(() => {
      const fetchCompanies = async () => {
        const { data, error } = await supabase
        .from("COMPANY")
        .select("*")
        .eq("company_name", company_name);
  
        if (error) {
          console.error("Error fetching companies:", error.message);
        } else {
          setCompanies(data);
        }
      };
  
      fetchCompanies();
    }, []);
      return companies;
    };

export default useGetCompaniesByName;