import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetContactsByPropertyManagerID = (property_manager_id) =>{
    const [contacts, setContacts] = useState([]);
  
    useEffect(() => {
      const fetchContacts = async () => {
        const { data, error } = await supabase
        .from("CONTACT")
        .select("*")
        .eq("property_manager_id", property_manager_id);
  
        if (error) {
          console.error("Error fetching contacts:", error.message);
        } else {
          setContacts(data);
        }
      };
  
      fetchContacts();
    }, []);
      return property;
    };

export default useGetContactsByPropertyManagerID;