import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetApplicationSupportingDoccumentsByID = (property_id, renter_id) =>{
    const [application_supporting_documents, setApplicationSupportingDocuments] = useState([]);
  
    useEffect(() => {
      const fetchApplicationSupportingDocuments = async () => {
        const { data, error } = await supabase
        .from("APPLICATION SUPPORTING DOCUMENT")
        .select("*")
        .eq("property_id", property_id)
        .eq("renter_id", renter_id);
  
        if (error) {
          console.error("Error fetching application supporting documents:", error.message);
        } else {
          setApplicationSupportingDocuments(data);
        }
      };
  
      fetchApplicationSupportingDocuments();
    }, []);
      return application_supporting_documents;
    };

export default useGetApplicationSupportingDoccumentsByID;