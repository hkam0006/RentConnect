import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetKeyByCompanyID = (company_id) =>{
    const [keys, setKeys] = useState([]);
  
    useEffect(() => {
      const fetchKeys = async () => {
        const { data, error } = await supabase
        .from("KEY")
        .select("*")
        .eq("company_id", company_id);
  
        if (error) {
          console.error("Error fetching keys:", error.message);
        } else {
            setKeys(data);
        }
      };
  
      fetchKeys();
    }, []);
      return keys;
    };

export default useGetKeyByCompanyID;