import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetCompanyByCompanyID = (company_id) =>{
    const [company, setCompany] = useState([]);
  
    useEffect(() => {
      const fetchCompany = async () => {
        const { data, error } = await supabase
        .from("COMPANY")
        .select("*")
        .eq("company_id", company_id);
  
        if (error) {
          console.error("Error fetching company:", error.message);
        } else {
          setCompany(data);
        }
      };
  
      fetchCompany();
    }, []);
      return company;
    };

export default useGetCompanyByCompanyID;